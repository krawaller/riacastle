define(["jQ","underscore","src/pagesloader!","json!data/db.json","jade!templates/object"],function($,_,pages,db,objecttmpl){
	return {
		start: function(){
			console.log("APP.JS");
			_.each(db.participants,function(def,id){
				$("body").append(objecttmpl({
					iconsrc: "http://units.wesnoth.org/1.10/pics/core$images$units$"+def.info.icon+".png",
					text: def.info.name,
					link: "user/"+id
				}));
			});
			$("body").append(objecttmpl({
				iconsrc: "https://raw.github.com/wesnoth/wesnoth-old/master/data/core/images/scenery/dwarven-doors-closed.png",
				text: "entered the castle",
				link: "action/entered"
			}));
			_.each(pages,function(val,key){
				$("body").append("<p>"+val.html+"</p>");
			});
		}
	};
});