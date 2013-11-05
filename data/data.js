// Augments all data files into a single data object to be consumed by the application.
// Is also responsible for calculating the scores of the users, since we now have access to users, actions and commands.
// And we fix the pages so they all have a nice content array
// Used in `app.js`.
define(["withresources!commands","withresources!equipment","withresources!pages","usersloader!"],
  function(commands,equipment,pages,users){
	return {
		commands: commands,
		equipment: equipment,
		actions: users.actions,
		icons: users.icons,
		// build upp unified "content" array for each page
		pages: _.mapObj(pages,function(page,pageid){
			arr = [];
			if (page.markdown) { arr.push({type:"text"}); }
			if (page.closeup) { arr.push({type:"closeup",template:page.jade,from:page.closeup}); }
			if (page.actionlist) { arr.push({type:"actionlist",filter:page.actionlist}); }
			if (page.userlist) { arr.push({type:"userlist",filter:page.userlist}); }
			return _.extend(page,{content:arr});
		}),
		// calculate the score for each user
		users: _.mapObj(users.users,function(user,userid){
			return _.extendChild(user,"info",{
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