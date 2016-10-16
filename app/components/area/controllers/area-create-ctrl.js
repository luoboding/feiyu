"use strict";
module.exports = function(ngModule){
	ngModule.controller('AreaCreateCtrl', function(AreaService, AppConfig, ModalService, $filter, Loader, $stateParams, $state, zone, parent) {
		var vm  = this;
		parent.unshift({
				id: '0',
				name: '顶级'
			});
		vm.parent = parent;
		vm.zone = zone;
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
