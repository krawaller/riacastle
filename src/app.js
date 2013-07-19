define(["backbone","text!../templates/test.html","json!../db/main","jade!../templates/testsomejade"],function(Backbone,sometext,somedata,somejade){
	return {
		start: function(){
			console.log("...START CALL!",sometext,somedata,somejade({greet:"HELLO JADE!"}));
		}
	};
});