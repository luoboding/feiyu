"use strict";
module.exports = function(ngModule){
	ngModule.controller('CaseCreateCtrl', function($scope, CaseService, AppConfig, ModalService, $filter, Loader, $state, zone, property) {
		var vm  = this;
    vm.zone = zone;
		vm.data = {};
		vm.images = [];
		vm.attribute = [];

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
		console.log(vm.property);

		$scope.$watch("vm.image", function(newValue, oldValue) {
			if (newValue) {
				vm.images.push(newValue);
				console.log(vm.images);
			}
		});

		_.extend(vm, {
			create: function() {
				Loader.show();
				vm.data.images = vm.images.join(',');
				vm.data.attribute = vm.attribute.join(',');
				CaseService.create(vm.data).then(function() {
					Loader.hide();
					$state.go('app.case.list');
				}, function(error) {
					Loader.hide();
					vm.error = error.response.error;
				});
      },
			shouldSelectedProperty: function(id) {
				return vm.attribute.indexOf(id) != -1;
			},
			selectProperty: function(id) {
				if (vm.attribute.indexOf(id) == -1) {
					vm.attribute.push(id);
				} else {
					vm.attribute.splice(vm.attribute.indexOf(id), 1);
				}
			}
		});
	});
};
