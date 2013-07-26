define(["backbone","src/router","src/mainview","src/navview","src/contentview","data/loaders/usersloader!","data/loaders/load!pages","src/views/graphicsoverview"],
  function(Backbone,Router,MainView,NavView,ContentView,database,pages,g){
	return {
		start: function(){
			var navView = new NavView(),
				contentView = new ContentView({database:database});
				mainView = new MainView({database:database,el:"#main",navView:navView,contentView:contentView}),
				router = new Router({database:database,pages:pages,mainView:mainView});
			mainView.render();
			Backbone.history.start();
			//router.navigate("home/",{trigger:true});
		}
	};
});