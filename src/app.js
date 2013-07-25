define([
	"jquery","underscore","data/loaders/pagesloader!",
	"data/loaders/usersloader!users",
	"jade!templates/object",
	"src/views/graphicsoverview"],function($,_,pages,db,objecttmpl,Overview){
	return {
		start: function(){
			console.log("APP.JS",db);
			/*_.each(db.participants,function(def,id){
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
			$("body").append((new Overview({kinds:"units"})).render().el);*/
		}
	};
});