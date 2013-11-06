// Augments all data files into a single data object to be consumed by the application.
// Is also responsible for calculating the scores of the users, since we now have access to users, actions and commands.
// And we fix the pages so they all have a nice content array
// Used in `app.js`.
define(["withresources!commands","withresources!equipment","withresources!pages","withresources!phases","usersloader!"],
  function(commands,equipment,pages,phases,users,query){
	return {
		commands: commands,
		phases: phases,
		icons: users.icons,
		// add the id to each item
		equipment: _.mapObj(equipment,function(equip,id){ return _.extend(equip,{id:id}); }),
		// augment action objects with data from corresponding command
		actions: _.mapObj(users.actions,function(action,actionid){
			return _.extend(action,_.pick(commands[action.type],["text","icon"]));
		}),
		// build upp unified "content" array for each page
		pages: _.mapObj(pages,function(page,pageid){
			arr = [];
			if (page.markdown) { arr.push({type:"text",markdown:page.markdown}); }
			if (page.closeuptext) { arr.push({type:"text",from:page.closeuptext}); }
			if (page.closeup) { arr.push({type:"closeup",template:page.jade,from:page.closeup}); }
			if (page.nav) { arr.push({type:"navlist",from:page.nav}); }
			if (page.actions) { arr.push({type:"actions",filter:page.actions}); }
			/*_.each(["users","equipment","resources","phases","actions"],function(type){
				var links = {users:"barracks",equipment:"armoury",resources:"library",phases:"throneroom"};
				if (page[type+"list"]) {
					arr.push({type:"list",from:type,filter:page[type+"list"],link:links[type]});
				}
			});*/
			return _.extend(page,{content:arr});
		}),
		// calculate the score for each user
		users: _.mapObj(users.users,function(user,userid){
			return _.extend(user,{
				score: _.reduce(users.actions,function(memo,action){
					whoscore = (action.who === userid ? commands[action.type].whocoin + (action.whobonus||0):0);
					targetscore = (action.target === userid ? commands[action.type].targetcoin + (action.targetbonus||0):0);
					return memo + whoscore + targetscore;
				},0)
			});
		}),
		// build resources from all resource-adding actions
		resources: _.reduce(users.actions,function(memo,action){
			return action.type !== "addresource" ? memo : _.extendChild(memo,action.id,_.pick(action,["name","link","id"]));
		},{})
	};
});