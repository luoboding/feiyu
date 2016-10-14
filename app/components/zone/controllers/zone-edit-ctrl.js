"use strict";
module.exports = function(ngModule){
	ngModule.controller('ZoneEditCtrl', function(ZoneService, AppConfig, ModalService, $filter, Loader, $stateParams, $state, zone) {
		var vm  = this;
		vm.zone = zone;
		_.extend(vm, {
			edit: function() {
				Loader.show();
				ZoneService.update($stateParams.id, vm.zone).then(function() {
					Loader.hide();
					$state.go('app.zone.list');
				}, function(error) {
					Loader.hide();
					vm.error = error.response.error;
				});
      }
		});
	});
};
