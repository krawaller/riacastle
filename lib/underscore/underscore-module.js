console.log("...LOADING underscore module");

define(["pureunderscore"],function(_){
	console.log(".....serving up underscore");
	_.mixin({
		// arrays passes through, non-arrays are wrapped in an array, falsy values returns empty array (or containing optional ifempty el)
		ensureArray: function(o,e){ return _.isArray(o) ? o : o ? [o] : e ? [e] : []; },
		// like `map`, but expects and returns an object instead of an array
		mapObj: function(obj,iterator,context){
			var keys = _.keys(obj);
			return _.reduce(_.map(obj,iterator,context),function(memo,val,i){
				return _.extend(_.object([keys[i]],[val]),memo);
			},{});
		},
		extendChild: function(obj,prop,source){
			obj[prop] = _.extend(obj[prop]||{},source);
			return obj;
		},
		sortObj: function(obj,sorter){
			return _.reduce(_.sortBy(obj,sorter),function(memo,part,i){
				return _.extend(memo,_.object([part.id||i],[part]));
			},{});
		}
	});
	return _; //.noConflict(); // remove the global _ left by pureunderscore, just to be nice :)
});