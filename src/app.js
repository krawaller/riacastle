define(["backbone","src/router","src/views/mainview","src/views/navview","src/views/contentview","data/data","src/views/graphicsoverview"],
  function(Backbone,Router,MainView,NavView,ContentView,data){
	return {
		start: function(){
			var navView = new NavView(),
				contentView = new ContentView({data:data}),
				mainView = new MainView({data:data,el:"#main",navView:navView,contentView:contentView}),
				router = new Router({data:data,mainView:mainView});
			mainView.render();
			Backbone.history.start();
		}
	};
});
