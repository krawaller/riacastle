define([ "backbone","jquery","underscore","data/query","jade!templates/object","jade!templates/action","src/views/graphicsoverview"],function(Backbone,$,_,query,objtmpl,actiontmpl,GraphicsView){
	return Backbone.View.extend({
		tabletopath: {users:"barracks",equipment:"armoury",resources:"library",phases:"throneroom",commands:"training"},
		objtmpl: objtmpl,
		actiontmpl: actiontmpl,
		// empty the element and append the results of each processed content definition
		render: function(pageid,pagedef,subid){
			this.$el.empty();
			// process all content defs and append each result
			console.log("CONTENT",pagedef.content);
			_.each((subid?[{type:"icon",from:pagedef.closeup||pagedef.closeuptext}]:[]).concat(pagedef.content),_.compose(_.bind(this.$el.append,this.$el),_.partial(this.renderRouter,pagedef,subid)),this);
			return this;
		},
		// merely routs the call from render to the correct function
		renderRouter: function(pagedef,subid,contentdef){
			return this["render"+contentdef.type](pagedef,subid,contentdef);
		},
		rendericon: function(pagedef,subid,contentdef){
			console.log("IIIICOOOON",contentdef.from);
			return "<div class='centerbox'>"+this.objtmpl({
				icon: this.options.data[contentdef.from][subid].icon,
				text: this.options.data[contentdef.from][subid].text || this.options.data[contentdef.from][subid].name,
				category: contentdef.from
			})+"</div>";
		},
		rendertext: function(pagedef,subid,contentdef){ return "<div class='text'>"+(contentdef.markdown || this.options.data[contentdef.from][subid].markdown)+"</div>"; },
		rendernavlist: function(pagedef,subid,contentdef){
			var link = this.tabletopath[contentdef.from];
			return _.reduce(this.options.data[contentdef.from],function(memo,objdef,objid){
				return memo+"<li>"+this.objtmpl({
					icon: objdef.icon,
					link: "#"+link+"/"+objdef.id,
					text: objdef.name || objdef.text,
					category: contentdef.from
				})+"</li>";
			},"<div class='centerbox'><ul class='horisontallist'>",this)+"</ul></div>";
		},
		rendercloseup: function(pagedef,subid,contentdef){
			console.log("CLOSEUP",contentdef.from,subid,this.options.data[contentdef.from][subid]);
			return "<div class='text'>"+contentdef.template(this.options.data[contentdef.from][subid])+"</div>";
		},
		renderview: function(pagedef,subid,contentdef){
			// assuming view is graphics view
			return (new GraphicsView({kinds:["units"]})).render().$el.html();
		},
		renderactions: function(pagedef,subid,contentdef){
			var db = this.options.data;
			var linkmap = this.tabletopath;
			var tmpl = this.objtmpl;
			return _.reduce(query.filter(db.actions,contentdef.filter,subid),function(memo,actiondef){
				return memo+"<li>"+this.actiontmpl(_.extend({
					url: actiondef.url,
					when: actiondef.when,
					action: this.objtmpl({
						icon: actiondef.icon,
						text: actiondef.text,
						category: "actions",
						link: "#training/"+actiondef.type
					}),
				},_.mapObj({who:"users",phase:"phases",gear:"equipment",id:"resources",target:"users"},function(val,key){
					if (actiondef[key]){
						d = db[val][actiondef[key]];
						return tmpl({
							fixcoin: (key=="who"&&actiondef.whocoin)||(key=="target"&&actiondef.targetcoin)||0,
							bonuscoin: (key=="who"&&actiondef.whobonus)||(key=="target"&&actiondef.targetbonus)||0,
							icon: d.icon,
							link: "#"+linkmap[val]+"/"+actiondef[key],
							text: d.text || d.name,
							category: val
						});
					}
				})))+"</li>";
			},"<div class='centerbox'><img class='actionimg' src='https://raw.github.com/wesnoth/wesnoth-old/master/data/core/images/items/burial.png'/><ul class='actionlist'>",this)+"</ul></div>";
		}
	});
});