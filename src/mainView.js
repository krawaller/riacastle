define([ "backbone","jquery","underscore","jade!../templates/main"],function(Backbone,$,_,template){
	return Backbone.View.extend({
		template: template,
		events: { 'click a[href^="nav-"]': "appLink" },
		// expects `o` to contain 'navView' and 'contentView'
		initialize: function(o){ },
		render: function(){
			this.$el.html(template({hello:"world"}));
			this.$("#nav").append(this.options.navView.render().el);
			this.$("#content").append(this.options.contentView.el);
			return this;
		},
		appLink: function(e){
			this.trigger("navto",$(e.currentTarget).attr("href").substr(4));
			e.preventDefault();
		},
		show: function(pageid,pagedef,subid){
			this.options.contentView.render(pageid,pagedef,subid);
			this.options.navView.setSection(pagedef.section);
		}
	});
});