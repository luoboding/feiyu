"use strict";
module.exports = function(ngModule){
	ngModule.controller('AreaEditCtrl', function(AreaService, Loader, $stateParams, $state, area, zone, parent) {
		var vm  = this;
		parent.unshift({
			id: '0',
			name: '顶级'
		});
		console.log('area', area);
		vm.parent = parent;
		vm.zone = zone;
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
