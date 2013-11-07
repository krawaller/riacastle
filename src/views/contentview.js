define([ "backbone","jquery","underscore","data/query","jade!templates/object","jade!templates/action"],function(Backbone,$,_,query,objtmpl,actiontmpl){
	return Backbone.View.extend({
		objtmpl: objtmpl,
		actiontmpl: actiontmpl,
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
		rendernavlist: function(pagedef,subid,contentdef){
			var link = {users:"barracks",equipment:"armoury",resources:"library",phases:"throneroom",commands:"training"}[contentdef.from];
			return _.reduce(this.options.data[contentdef.from],function(memo,objdef,objid){
				return memo+"<li>"+this.objtmpl({
					icon: objdef.icon,
					link: "#"+link+"/"+objdef.id,
					text: objdef.name || objdef.text,
					category: contentdef.from
				})+"</li>";
			},"<ul class='horisontallist'>",this)+"</ul>";
		},
		rendercloseup: function(pagedef,subid,contentdef){
			console.log("CLOSEUP",contentdef.from,subid,this.options.data[contentdef.from][subid]);
			return contentdef.template(this.options.data[contentdef.from][subid]);
		},
		renderactions: function(pagedef,subid,contentdef){
			var db = this.options.data
			var linkmap = {users:"barracks",equipment:"armoury",resources:"library",phases:"throneroom",commands:"training"};
			var tmpl = this.objtmpl;
			return _.reduce(query.filter(db.actions,contentdef.filter,subid),function(memo,actiondef){
				return memo+"<li>"+this.actiontmpl(_.extend({
					when: actiondef.when,
					action: this.objtmpl({
						icon: actiondef.icon,
						text: actiondef.text,
						category: "actions",
						link: "#training/"+actiondef.type
					}),
					/*who: this.objtmpl({
						icon: db.users[actiondef.who].icon,
						link: "#barracks/"+actiondef.who,
						text: db.users[actiondef.who].name,
						category: "users"
					}),
					phase: actiondef.phase ? this.objtmpl({
						icon: db.phases[actiondef.phase].icon,
						link: "#throneroom/"+actiondef.phase,
						category: "phases",
						text: this.options.data.phases[actiondef.phase].name
					}) : "",*/
				},_.mapObj({who:"users",phase:"phases",gear:"equipment",id:"resources"},function(val,key){
					console.log("VAL",val,"KEY",key,"ACTIONDEFKEY",actiondef[key],"ACTIONDEF",actiondef);
					if (actiondef[key]){
						d = db[val][actiondef[key]];
						return tmpl({
							icon: d.icon,
							link: "#"+linkmap[val]+"/"+actiondef[key],
							text: d.text || d.name,
							category: val
						});
					return "";
					}
				})))+"</li>";
			},"<p>Related actions:</p><ul class='actionlist'>",this)+"</ul>";
		}
	});
});