"use strict";
module.exports = function(ngModule){
	ngModule.controller('DealerEditCtrl', function(ModalService, DealerService, AppConfig, $filter, $state, $stateParams, Loader, dealer) {
		var vm = this;
    vm.data = dealer;
    console.log('dealer', dealer);
		_.extend(vm, {
			edit: function() {
				Loader.show();
        var id = $stateParams.id;
				DealerService.update(id, vm.data).then(function() {
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
