define([ "backbone","jquery","underscore"],function(Backbone,$,_){
	return Backbone.Router.extend({
		// expects `o` to contain `mainView` and `data`
		initialize: function(o){
			// set a route for each entry in o.data.pages, using `#nav` as callback with correct `pagedef` and `pageid` prefilled
			_.each(o.data.pages,function(pagedef,pageid){
				this.route(pagedef.route,pageid, _.partial(this.nav,pagedef,pageid));
			},this);
			// keep a reference to `mainView` for use in `nav`
			this.mainView = o.mainView;
		},
		// triggered for each route, merely passes the call on to `mainView`
		nav: function(pagedef,pageid,subid){ this.mainView.show(pageid,pagedef,subid); }
	});
});