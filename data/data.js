// Augments all data files into a single data object to be consumed by the application.
// Is also responsible for calculating the scores of the users, since we now have access to users, actions and commands.
// And we fix the pages so they all have a nice content array
// Used in `app.js`.
define(["json!data/static/commands","withresources!equipment","withresources!pages","withresources!phases","usersloader!"],
  function(commands,equipment,pages,phases,users,query){
	return {
		phases: _.sortObj(phases,function(phase){return parseInt(phase.id[phase.id.length-1]);}),
		icons: users.icons,
		// add the id to each item
		commands: _.mapObj(commands,function(cmnd,id){ return _.extend(cmnd,{id:id}); }),
		// add the id to each item
		equipment: _.mapObj(equipment,function(equip,id){ return _.extend(equip,{id:id}); }),
		// augment action objects with data from corresponding command
		actions: _.sortObj(_.mapObj(users.actions,function(action,actionid){
			return _.extend(action,_.pick(commands[action.type],["text","icon","whocoin","targetcoin"]));
		}),"when"),
		// build upp unified "content" array for each page
		pages: _.mapObj(pages,function(page,pageid){
			arr = [];
			if (page.markdown) { arr.push({type:"text",markdown:page.markdown}); }
			if (page.closeuptext) { arr.push({type:"text",from:page.closeuptext}); }
			if (page.closeup) { arr.push({type:"closeup",template:page.jade,from:page.closeup}); }
			if (page.nav) { arr.push({type:"navlist",from:page.nav}); }
			if (page.actions) { arr.push({type:"actions",filter:page.actions}); }
			if (page.view) { arr.push({type:"view","view":page.view}); }
			return _.extend(page,{content:arr});
		}),
		// calculate the score for each user, and correct icon address
		users: _.mapObj(users.users,function(user,userid){
			return _.extend(user,{
				score: _.reduce(users.actions,function(memo,action){
					whoscore = (action.who === userid ? commands[action.type].whocoin + (action.whobonus||0):0);
					targetscore = (action.target === userid ? commands[action.type].targetcoin + (action.targetbonus||0):0);
					return memo + whoscore + targetscore;
				},0),
				icon: "http://units.wesnoth.org/1.10/pics/core$images$units$"+user.icon
			});
		}),
		// build resources from all resource-adding actions
		resources: _.reduce(users.actions,function(memo,action){
			return action.type !== "addresource" ? memo : _.extendChild(memo,action.id,_.extend(_.pick(action,["name","url","id","shortdesc"]),{icon:"https://raw.github.com/wesnoth/wesnoth-old/master/data/core/images/items/book1"}));
		},{})
	};
});