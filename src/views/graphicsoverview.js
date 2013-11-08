define(["backbone","jquery","underscore","json!data/static/graphics.json","data/data"],function(Backbone,$,_,graphics,data){
	return Backbone.View.extend({
		render: function(){
			var kinds = this.options.kinds;
			this.$el.html(_.reduce(_.ensureArray(kinds,_.keys(graphics)),function(html,kind){
				return html+(kinds.length>1?"<h2>"+kind+"</h2>":"")+"<p>"+_.reduce(graphics[kind].urls,function(str,url){
					return str+"<img "+(_.indexOf(data.icons,url)>-1?"class='chosen' ":"")+"title='"+url+"' alt='"+url+"' src='"+graphics[kind].pre+url+".png'/>";
				},"",this)+"</p>";
			},"",this));
			return this;
		}
	});
});