// This module first loads a masterlist of all users (`userlist.allusers`), and then loads a json file for each user.
// The users' individual `actions` array are also baked together into a master actions array.

define(["json!data/static/userlist","underscore"],function(users,_){
	return {
		load: function(resourceId,require,onLoad){
			require(_.map(users.allusers,function(userid){ return "json!../data/users/"+userid; }),function(){
				// capture the arguments object containing the individual data files into a closure variable, for access in the `reduce` iterator
				var jsonarr = _.map(arguments,_.identity);
				// make the module return the result of a `reduce` call that bakes all individual files together into a single database object
				onLoad(_.reduce(users.allusers,function(memo,userid,i){
					return {
						// add the user to the `users` object, using id as key
						users: _.extend(_.object([userid],[jsonarr[i]]),memo.users),
						// add the user´s actions to the `actions` array, augmenting each action with a `who` prop storing the userid
						actions: memo.actions.concat(_.map(jsonarr[i].actions,function(o){return _.extend({who:userid},o);}))
					};
				},{users:{},actions:[]}));
			});
		}
	};
});