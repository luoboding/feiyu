"use strict";
module.exports = function(ngModule){
	ngModule.controller('marketingEditCtrl', function(MarketingService, AppConfig, ModalService, $filter, Loader, $stateParams, $state, marketing) {
		var vm  = this;
		vm.marketing = marketing;
		_.extend(vm, {
			edit: function() {
				Loader.show();
				marketingService.update($stateParams.id, vm.marketing).then(function() {
					Loader.hide();
					$state.go('app.marketing.list');
				}, function(error) {
					Loader.hide();
					vm.error = error.response.error;
				});
      },
			types: $filter('marketingTypeFilter').searchOptions
		});
	});
};
