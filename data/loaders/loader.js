define(["underscore"],function(_){
	return {
		load: function(resourceId,require,onLoad){
			console.log("MOOOO",resourceId);
			var d = {
				users: {
					source: "json!data/static/userlist",
					part: "json!../data/users/",
					list: function(main){ return main.allusers; }
				},
				pages: {
					source: "json!data/static/pages",
					part: "mdown!../../markdown/",
					list: function(main){ return keys(main); }
				}
			}[resourceId];
			console.log("D",d);
			require([d.source],function(main){
				require(_.map(d.list(main),function(partid){ console.log("WOO",partid); return d.part+partid; }),function(){
					var parts = _.map(arguments,_.identity);
					console.log("LALALALLALA",parts);
					onLoad(_.reduce(d.source.allusers,function(memo,partid,i){
						return _.extend(memo,_.object([partid],[parts[i]]));
					},{}));
				});
			});
		}
	};
});