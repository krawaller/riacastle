console.log("...LOADING underscore module");

define(["pureunderscore"],function(_){
	console.log(".....serving up underscore");
	_.ensureArray = function(o,e){ return _.isArray(o) ? o : o ? [o] : e || []; };
	return _//.noConflict(); // remove the global _ left by pureunderscore, just to be nice :)
});