console.log("...LOADING underscore module");

define(["pureunderscore"],function(_){
	console.log(".....serving up underscore");
	_.mixin({
		// arrays passes through, non-arrays are wrapped in an array, falsy values returns empty array (or containing optional ifempty el)
		ensureArray: function(o,e){ return _.isArray(o) ? o : o ? [o] : e ? [e] : []; },
		// like `map`, but returns an object where each property has been mapped
		mapObj: function(obj,iterator,context){
			var keys = _.keys(obj);
			return _.reduce(_.map(obj,iterator,context),function(memo,val,i){
				return _.extend(_.object([keys[i]],[val]),memo);
			},{});
		}
	});
	return _; //.noConflict(); // remove the global _ left by pureunderscore, just to be nice :)
});