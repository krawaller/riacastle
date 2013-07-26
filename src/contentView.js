define([ "backbone","jquery","underscore"],function(Backbone,$,_){
	return Backbone.View.extend({
		// empty the element and append the results of each processed content definition
		render: function(contentarr){
			this.$el.empty();
			_.each(_.ensureArray(contentarr),_.compose(this.$el.append,this.process),this);
			return this;
		},
		// receives a content definition, returns the html that should be inserted
		process: function(def){
			return def.markdown;
		}
	});
});