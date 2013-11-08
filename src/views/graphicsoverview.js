define(["backbone","jquery","underscore","json!data/static/graphics.json","data/data"],function(Backbone,$,_,graphics,data){
	return Backbone.View.extend({
		render: function(){
			this.$el.html(_.reduce(_.ensureArray(this.options.kinds,_.keys(graphics)),function(html,kind){
				return html+"<h2>"+kind+"</h2><p>"+_.reduce(graphics[kind].urls,function(str,url){
					return str+"<img "+(_.indexOf(data.icons,url)>-1?"class='chosen' ":"")+"title='"+url+"' alt='"+url+"' src='"+graphics[kind].pre+url+".png'/>";
				},"",this)+"</p>";
			},"",this));
			return this;
		}
	});
});