define([ "backbone","jquery","underscore","jade!../templates/nav"],function(Backbone,$,_,template){
	return Backbone.View.extend({
		template: template,
		initialize: function(o){},
		render: function(){ this.$el.html(template({hello:"world"})); return this; },
		setSection: function(sectionid){
			this.$(".active").removeClass('active');
			this.$("."+sectionid).addClass('active');
		}
	});
});