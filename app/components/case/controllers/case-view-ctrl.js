"use strict";
module.exports = function(ngModule){
	ngModule.controller('CaseViewCtrl', function(CaseService, AppConfig, ModalService, $filter, Loader, $stateParams, $state, showcase, property) {
		var vm  = this;
		vm.data = showcase;
		vm.attribute = showcase.attribute.split(',');
		vm.file= {
			url: showcase.file,
			name: "下载"
		};
		vm.images = showcase.images.split(',');
		var getChilden = function(list) {
			for(var i = 0, length = list.length; i < length; i++) {
				list[i].children = [];
				for(var j = 0, len = property.length; j<len; j ++) {
					if(list[i].id == property[j].pid) {
						list[i].children.push(property[j]);
					}
				}
				if (list[i].children.length > 0) {
					getChilden[list[i].children];
				}
			}
		};
		vm.property = [];
		for(var i = 0, length = property.length; i < length; i++) {
			if (property[i].pid == 0) {
				vm.property.push(property[i]);
			}
		}
		getChilden(vm.property);

		vm.shouldSelectedProperty = function(id) {
			return vm.attribute.indexOf(id) != -1;
		};

	});
};
