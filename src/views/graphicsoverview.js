define(["backbone","jquery","underscore","json!data/graphics.json"],function(Backbone,$,_,graphics){
	return Backbone.View.extend({
		render: function(){
			this.$el.html(_.reduce(this.options.kinds||_.keys(graphics),function(html,kind){
				return html+"<h2>"+kind+"</h2><p>"+_.reduce(graphics[kind].urls,function(str,url){
					return str+"<img title='"+url+"' alt='"+url+"' src='"+graphics[kind].pre+url+".png'/>";
				},"",this)+"</p>";
			},"",this));
			return this;
		}
	});
});