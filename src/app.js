define(["backbone","jQ","underscore","json!../json/graphics"],function(Backbone,$,_,graphics){
	return {
		start: function(){
			_.each(graphics.units.urls,function(url){
				$("body").append("<img alt='"+url+"' title='"+url+"' src='"+graphics.units.pre+url+".png' />");
			});
		}
	};
});