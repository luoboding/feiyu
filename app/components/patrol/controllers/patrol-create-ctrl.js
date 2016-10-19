"use strict";
module.exports = function(ngModule){
	ngModule.controller('PatrolCreateCtrl', function(PatrolService, AppConfig, ModalService, $filter, Loader, parents, $stateParams, $state, responser) {
		var vm  = this;
		vm.responser = responser;
		vm.patrol = {};
		_.extend(vm, {
			create: function() {
				Loader.show();
				patrolService.create(vm.patrol).then(function() {
					Loader.hide();
					$state.go('app.patrol.list');
				}, function(error) {
					Loader.hide();
					vm.error = error.response.error;
				});
      }
		});
	});
};
