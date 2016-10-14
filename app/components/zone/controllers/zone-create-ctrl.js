"use strict";
module.exports = function(ngModule){
	ngModule.controller('ZoneCreateCtrl', function(ZoneService, AppConfig, ModalService, $filter, Loader, $stateParams, $state) {
		var vm  = this;
		vm.zone = {};
		_.extend(vm, {
			create: function() {
				Loader.show();
				ZoneService.create(vm.zone).then(function() {
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
