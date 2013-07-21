define(["jQ","underscore","json!../json/db","jade!../templates/object","mdown!../markdown/test.md"],function($,_,db,usertmpl,md){
	return {
		start: function(){
			console.log("APP.JS");
			_.each(db.participants,function(def,id){
				$("body").append(usertmpl({
					iconsrc: "http://units.wesnoth.org/1.10/pics/core$images$units$"+def.info.icon+".png",
					text: def.info.name,
					link: "user/"+id
				}));
			});
			$("body").append(usertmpl({
				iconsrc: "https://raw.github.com/wesnoth/wesnoth-old/master/data/core/images/scenery/dwarven-doors-closed.png",
				text: "entered the castle",
				link: "action/entered"
			}));
			$("body").append(md);
		}
	};
});