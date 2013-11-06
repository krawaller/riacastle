define([ "backbone","jquery","underscore","data/query","jade!templates/object"],function(Backbone,$,_,query,objtmpl){
	return Backbone.View.extend({
		objtmpl: objtmpl,
		// empty the element and append the results of each processed content definition
		render: function(pageid,pagedef,subid){
			this.$el.empty();
			// process all content defs and append each result
			console.log("CONTENT",pagedef.content);
			_.each(pagedef.content,_.compose(_.bind(this.$el.append,this.$el),_.partial(this.renderRouter,pagedef,subid)),this);
			return this;
		},
		// merely routs the call from render to the correct function
		renderRouter: function(pagedef,subid,contentdef){
			return this["render"+contentdef.type](pagedef,subid,contentdef);
		},
		rendertext: function(pagedef,subid,contentdef){ return contentdef.markdown || this.options.data[contentdef.from][subid].markdown; },
		renderlist: function(pagedef,subid,contentdef){
			console.log("GONNA RENDER LIST",contentdef.from,this.options.data[contentdef.from]);
			return _.reduce(query.filter(this.options.data[contentdef.from],contentdef.filter,subid),function(memo,objdef,objid){
				console.log("reducing",objid,objdef,memo);
				return memo+"<li>"+this.objtmpl({
					icon: objdef.icon,
					link: "#"+contentdef.link+"/"+objdef.id,
					text: objdef.name
				})+"</li>";
			},"<ul class='horisontallist'>",this)+"</ul>";
		},
		rendercloseup: function(pagedef,subid,contentdef){
			console.log("CLOSEUP",contentdef.from,subid,this.options.data[contentdef.from][subid]);
			return contentdef.template(this.options.data[contentdef.from][subid]);
		}
	});
});