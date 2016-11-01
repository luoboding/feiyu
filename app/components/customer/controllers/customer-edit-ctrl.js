"use strict";
module.exports = function(ngModule){
	ngModule.controller('CustomerEditCtrl', function(CustomerService, AppConfig, ModalService, $filter, Loader, $stateParams, $state, customer, parents) {
		var vm  = this;
		vm.data = customer;
		_.extend(vm, {
			edit: function() {
				Loader.show();
				CustomerService.update($stateParams.id, vm.data).then(function() {
					Loader.hide();
					$state.go('app.customer.list');
				}, function(error) {
					Loader.hide();
					vm.error = error.response.error;
				});
      },
			sex: $filter('CustomerSexFilter').searchOptions
		});
	});
};
