define([ "backbone","jquery","underscore","jade!templates/object"],function(Backbone,$,_,objtmpl){
	return Backbone.View.extend({
		objtmpl: objtmpl,
		// empty the element and append the results of each processed content definition
		render: function(pageid,pagedef,subid){
			this.$el.empty();
			// process all content defs and append each result
			_.each(_.ensureArray(pagedef.content,{type:"text"}),_.compose(_.bind(this.$el.append,this.$el),_.partial(this.renderRouter,pagedef,subid)),this);
			return this;
		},
		// merely routs the call from render to the correct function
		renderRouter: function(pagedef,subid,contentdef){
			return this["render"+contentdef.type](pagedef,subid,contentdef);
		},
		rendertext: function(pagedef,subid,contentdef){ return pagedef.markdown; },
		renderuserlist: function(pagedef,subid,contentdef){
			return _.reduce(this.options.database.users,function(memo,userdef,userid){
				console.log("reducing",userid,userdef,memo);
				return memo+"<li>"+this.objtmpl({
					icon: userdef.info.icon,
					link: "#throneroom/"+userid,
					text: userdef.info.name
				})+"</li>";
			},"<ul class='horisontallist'>",this)+"</ul>";
		},
		renderuser: function(pagedef,subid,contentdef){
			var userdef = this.options.database.users[subid];
			return this.objtmpl({
				icon: userdef.info.icon,
				link: "#throneroom/"+subid,
				text: userdef.info.name
			});
		},
		// receives a content definition, returns the html that should be inserted
		renderPart: function(pagedef,subid,contentdef){
			switch(contentdef.type){
				case "user":
					var userdef = this.options.database.users[subid];
					return this.objtmpl({
						icon: userdef.info.icon,
						link: "#throneroom/"+subid,
						text: userdef.info.name
					});
				case "unitlist":
					console.log("GONNA REDUCE;",this.options.database);
					return _.reduce(this.options.database.users,function(memo,userdef,userid){
						console.log("reducing",userid,userdef,memo);
						return memo+"<li>"+this.objtmpl({
							icon: userdef.info.icon,
							link: "#throneroom/"+userid,
							text: userdef.info.name
						})+"</li>";
					},"<ul class='horisontallist'>",this)+"</ul>";
				default: return pagedef.markdown;
			}
		}
	});
});