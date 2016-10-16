"use strict";
module.exports = function(ngModule){
	ngModule.controller('DealerCreateCtrl', function(ModalService, DealerService, AppConfig, $filter, $state, Loader) {
		var vm = this;
		_.extend(vm, {
			create: function() {
				Loader.show();
				DealerService.create(vm.data).then(function() {
					Loader.hide();
					$state.go('app.dealer.list');
				}, function(error) {
					Loader.hide();
					vm.error = error.response.error;
				});
			}
    });
  });
};
