define(["backbone","jQ","underscore","json!../json/db","jade!../templates/user"],function(Backbone,$,_,db,usertmpl){
	return {
		start: function(){
			console.log("APP.JS");
			_.each(db.participants,function(def,id){
				$("body").append(usertmpl(def));
			});
		}
	};
});