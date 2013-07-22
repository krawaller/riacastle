define(["backbone","jQ","underscore","require"],function(backbone,$,_,require){
	content = require("mdown!../markdown/test.md");
	return {
		draw: function(){
			$("body").append(content);
		}
	};
});