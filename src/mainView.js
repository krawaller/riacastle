define([ "backbone","jquery","underscore","jade!../templates/main"],function(Backbone,$,_,template){
	return Backbone.View.extend({
		template: template,
		// expects `o` to contain `database` and 'navView'
		initialize: function(o){

		},
		render: function(){
			this.$el.html(template({hello:"world"}));
			this.$("#nav").html(this.options.navView.render().el);
			return this;
		}
	});
});