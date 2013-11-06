define(["underscore"],function(_){
	return {
		checkItem: function(id,item,filter){
			console.log("CHECKING ITEM",filter,id,item,filter==="all" || (filter.matchesid && item[filter.matchesid] === id));
			return filter==="all" || (filter.matchesid && item[filter.matchesid] === id) || (filter.proptocheck && item[filter.proptocheck] === filter.propval);
		},
		filter: function(table,filters,id){
			console.log("FILTER",filters,id,table);
			return _.filter(table,function(item){
				return _.some(_.ensureArray(filters),_.partial(this.checkItem,id,item));
			},this);
		}
	};
});