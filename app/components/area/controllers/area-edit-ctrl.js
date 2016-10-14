"use strict";
module.exports = function(ngModule){
	ngModule.controller('AreaEditCtrl', function(AreaService, AppConfig, ModalService, $filter, Loader, $stateParams, $state, area) {
		var vm  = this;
		vm.area = area;
		_.extend(vm, {
			edit: function() {
				Loader.show();
				AreaService.update($stateParams.id, vm.area).then(function() {
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
