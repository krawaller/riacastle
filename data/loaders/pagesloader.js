// This module first loads a masterlist of all pages, and then augments each page definition in that object with
// the corresponding markdown file.

define(["json!data/static/pages","underscore"],function(pages,_){
	return {
		load: function(resourceId,require,onLoad){
			require(_.map(pages,function(page,pageid){ return "mdown!../../markdown/pages/"+pageid+".md"; }),function(){
				var htmlarr = _.map(arguments,_.identity);
				onLoad(_.reduce(_.keys(pages),function(memo,pageid,i){
					return _.extend(memo,_.object([pageid],[_.extend(pages[pageid],{ html: htmlarr[i] })]));
				},{}));
			});
		}
	};
});