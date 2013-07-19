console.log("...LOADING bootstrap.js");

//We configure require with paths to our modules, so we can reference them by name when we include them.
require.config({
	paths: {
		jQ: "../lib/jquery-v2.0.3",
		cs: "../lib/require/load_coffeescript-v0.4.3",
		underscore: "../lib/underscore-v1.5.1",
		purebackbone: "../lib/backbone/backbone-v1.0.0",
		"bb-rel":"../lib/backbone/backbone-relational-v0.7.1",
		"bb-loc":"../lib/backbone/backbone-localStorage-v1.1.6",
		backbone: "../lib/backbone/backbone-module"
	},
	shim: {
		underscore: {
			/*init: function(){
				console.log("......shimming underscore");
				return this._.noConflict();
			}*/
		},
		jQ: {
			init: function(){
				console.log("......shimming jQuery");
				return this.jQuery.noConflict(true);
			}
		},
		purebackbone: {
			deps: ["jQ","underscore"],
			exports: "Backbone"
		},
		"bb-rel": ["purebackbone","underscore"],
		"bb-loc": ["purebackbone","underscore"]
	}
});