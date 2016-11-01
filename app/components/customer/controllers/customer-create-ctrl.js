"use strict";
module.exports = function(ngModule){
	ngModule.controller('CustomerCreateCtrl', function(CustomerService, AppConfig, ModalService, $filter, Loader, parents, $stateParams, $state) {
		var vm  = this;
		vm.data = {};
		_.extend(vm, {
			create: function() {
				Loader.show();
				CustomerService.create(vm.data).then(function() {
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
