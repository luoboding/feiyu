"use strict";
module.exports = function(ngModule){
	ngModule.controller('ZoneEditCtrl', function(ZoneService, AppConfig, ModalService, $filter, Loader, $stateParams, $state, zone, parent) {
		var vm  = this;
		vm.zone = zone;
		parent.unshift({
			name: '顶级',
			id: '0'
		})
		vm.parent = parent;

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
