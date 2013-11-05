// used in `data.js` (the main data module) to load commands, equipment and pages with
// corresponding markdown file and/or jade template
define(["underscore"],function(_){
	return {
		load: function(resourceId,require,onLoad){
			// load data/static/[resourceId] which is expected to contain a master object will id keys
			require(["json!data/static/"+resourceId],function(main){
				// collect all ids without the `noresource` flag
				var ids = _.filter(_.keys(main),function(key){return !main[key].noresource;}),
					// each id requires markdown and/or jade template, build array
					reqs = _.reduce(ids,function(memo,id){
						var def = main[id], add = [];
						if (!def.nomarkdown){ add.push({id:id,what:"markdown",path:"mdown!markdown/"+resourceId+"/"+id+".md"}); }
						if (def.template){ add.push({id:id,what:"jade",path:"jade!templates/"+id}); }
						return memo.concat(add);
					},[],this);
				// now require markdown/[resourceId]/[objId] for each key in master object
				require(_.pluck(reqs,"path"),function(){
					// build an object containing the texts stored by id (and also with id as prop as a bonus)
					var args = arguments, resourcesById = _.reduce(reqs,function(memo,req,i){
						return _.extendChild(memo,req.id,_.object([req.what],[args[i]]));
					},{});
					// return with the merger of the master object and the markdowns
					onLoad(_.mapObj(main,function(o,id){return _.extend(o,resourcesById[id]);}));
				});
			});
		}
	};
});