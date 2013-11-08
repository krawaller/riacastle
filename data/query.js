define(["underscore"],function(_){
	return {
		checkItem: function(id,item,filter){
			return filter==="all" || (filter.matchesid && item[filter.matchesid] === id) || (filter.proptocheck && item[filter.proptocheck] === filter.propval) || (filter.notempty && item[filter.notempty]);
		},
		filter: function(table,filters,id){
			return _.filter(table,function(item){
				return _.some(_.ensureArray(filters),_.partial(this.checkItem,id,item));
			},this);
		}
	};
});