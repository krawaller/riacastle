define(["underscore"],function(_){
	return {
		load: function(resourceId,require,onLoad){
			// load data/static/[resourceId] which is expected to contain a master object will id keys
			require(["json!data/static/"+resourceId],function(main){
				var ids = _.keys(main), paths = _.map(ids,function(id){ return "mdown!../../markdown/"+resourceId+"/"+id+".md";});
				// now require markdown/[resourceId]/[objId] for each key in master object
				require(paths,function(){
					// build an object containing the texts stored by id
					var args = arguments, markdownsById = _.reduce(ids,function(memo,id,i){ return _.extend(memo,_.object([id],[{markdown:args[i]}])); },{});
					console.log("MARK",markdownsById)
					// return with the merger of the master object and the markdowns
					onLoad(_.mapObj(main,function(o,id){return _.extend(o,markdownsById[id]);}));
				});
			});
		}
	};
});