"use strict";
module.exports = function(ngModule){
	ngModule.controller('ZoneCreateCtrl', function(ZoneService, AppConfig, ModalService, $filter, Loader, $stateParams, $state, parent) {
		var vm  = this;
		vm.zone = {};
		parent.unshift({
			name: '顶级',
			id: 0
		});
		vm.parent = parent;
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
