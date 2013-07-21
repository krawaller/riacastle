define(["showdown"],function(Showdown){
	return new Showdown.converter(); // because that's what the mdown require plugin expects
});