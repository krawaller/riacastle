// Augments all data files into a single data object to be consumed by the application.
// Is also responsible for calculating the scores of the users.
// Used in `app.js`.
define(["withresources!commands","withresources!equipment","withresources!pages","usersloader!"],
  function(commands,equipment,pages,users){
	return {
		commands: commands,
		equipment: equipment,
		pages: pages,
		users: _.mapObj(users.users,function(user,userid){
			return _.extendChild(user,"info",{
				score: _.reduce(users.actions,function(memo,action){
					return memo + (action.who === userid ? commands[action.type].whocoin + (action.whobonus||0):0) + (action.target === userid ? commands[action.type].targetcoin + (action.targetbonus||0):0);
				},0)
			});
		}),
		actions: users.actions
	};
});