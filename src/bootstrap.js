console.log("...LOADING bootstrap.js");

//We configure require with paths to our modules, so we can reference them by name when we include them.
require.config({
	paths: {
		jQ: "../lib/jquery-v2.0.3",
		cs: "../lib/require/load_coffeescript-v0.4.3",
		text: "../lib/require/load_text-v2.0.7",
		json: "../lib/require/load_json-v0.3.1",
		jade: "../lib/require/load_jade-v0.27.6",
		pureunderscore: "../lib/underscore/underscore-v1.5.1",
		purebackbone: "../lib/backbone/backbone-v1.0.0",
		"bb-rel":"../lib/backbone/backbone-relational-v0.7.1",
		"bb-loc":"../lib/backbone/backbone-localStorage-v1.1.6",
		backbone: "../lib/backbone/backbone-module",
		underscore: "../lib/underscore/underscore-module"
	},
	shim: {
		pureunderscore: {
			exports: "_"
		},
		underscore: {
			exports: "_"
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
		"bb-rel": ["purebackbone","pureunderscore"],
		"bb-loc": ["purebackbone","pureunderscore"]
	}
});