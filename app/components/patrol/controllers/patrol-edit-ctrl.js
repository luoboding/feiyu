"use strict";
module.exports = function(ngModule){
	ngModule.controller('PatrolEditCtrl', function(PatrolService, ModalService, $filter, Loader, $stateParams, $state, patrol, responser) {
		var vm  = this;
		vm.responser = responser;
		vm.patrol = patrol;
		_.extend(vm, {
			edit: function() {
				Loader.show();
				PatrolService.update($stateParams.id, vm.patrol).then(function() {
					Loader.hide();
					$state.go('app.patrol.list');
				}, function(error) {
					Loader.hide();
					vm.error = error.response.error;
				});
      },
			types: $filter('patrolTypeFilter').searchOptions
		});
	});
};
