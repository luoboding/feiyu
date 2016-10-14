"use strict";
module.exports = function(ngModule){
	ngModule.controller('AreaCreateCtrl', function(AreaService, AppConfig, ModalService, $filter, Loader, $stateParams, $state) {
		var vm  = this;
		vm.area = {};
		_.extend(vm, {
			create: function() {
				Loader.show();
				AreaService.create(vm.area).then(function() {
					Loader.hide();
					$state.go('app.area.list');
				}, function(error) {
					Loader.hide();
					vm.error = error.response.error;
				});
      }
		});
	});
};
