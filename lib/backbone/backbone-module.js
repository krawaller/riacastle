console.log("...LOADING backbone module");

define(["purebackbone","bb-rel","bb-loc"],function(BB){
	console.log(".....serving up backbone");
	BB.noConflict(); // remove the global backbone left by purebackbone, just to be nice :)
	delete window.Store; // also remove ugly store variable created by naughty bb-loc
	return BB;
});