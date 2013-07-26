define([ "backbone","jquery","underscore"],function(Backbone,$,_){
	return Backbone.View.extend({
		// empty the element and append the results of each processed content definition
		render: function(pageid,pagedef,subid){
			this.$el.empty();
			// process all content defs and append each result
			_.each(_.ensureArray(pagedef.content,{type:"text"}),_.compose(_.bind(this.$el.append,this.$el),_.partial(this.renderPart,pagedef,subid)),this);
			return this;
		},
		// receives a content definition, returns the html that should be inserted
		renderPart: function(pagedef,subid,contentdef){
			switch(contentdef.type){
				default: return pagedef.markdown;
			}
		}
	});
});