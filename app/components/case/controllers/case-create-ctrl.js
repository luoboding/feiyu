"use strict";
module.exports = function(ngModule){
	ngModule.controller('CaseCreateCtrl', function($scope, CaseService, AppConfig, ModalService, $filter, Loader, $state, zone, property) {
		var vm  = this;
    vm.zone = zone;
		vm.property = property;
		vm.data = {};
		vm.images = [];

		$scope.$watch("vm.image", function(newValue, oldValue) {
			if (newValue) {
				vm.images.push(newValue);
			}
		});

		_.extend(vm, {
			create: function() {
				Loader.show();
				vm.data.file = vm.file.url;
				vm.data.images = vm.images.join(',');
				CaseService.create(vm.data).then(function() {
					Loader.hide();
					$state.go('app.case.list');
				}, function(error) {
					Loader.hide();
					vm.error = error.response.error;
				});
      }
		});
	});
};
