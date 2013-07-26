define([ "backbone","jquery","underscore"],function(Backbone,$,_){
	return Backbone.Router.extend({
		// expects `o` to contain `mainView`, `pages` and `database`
		initialize: function(o){
			console.log("ROUTESTART",o.mainView,o);
			// set a route for each entry in o.pages, using `#nav` as callback with correct `pageid` prefilled
			_.each(o.pages,function(pagedef,pageid){
				this.route(pagedef.route,pageid, _.partial(this.nav,pageid));
			},this);
			// capture all `navto` events from the mainview
			this.listenTo(o.mainView,"navto",this.nav);
			// routes constructor doesn't automatically store initialize options
			this.options = o;
		},
		nav: function(pageid,subid){
			console.log("NAV",pageid,subid,this);
			var pagedef = this.options.pages[pageid];
			this.navigate(pagedef.route);
			this.options.mainView.show(pageid,pagedef,subid);
		}
	});
});