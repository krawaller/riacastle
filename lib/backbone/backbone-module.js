console.log("...LOADING backbone module");

define(["purebackbone","bb-rel","bb-loc"],function(BB){
	console.log(".....serving up backbone");
	Backbone.noConflict(); // remove the global backbone left by purebackbone, just to be nice :)
	return BB; //.noConflict();
});