"use strict";
module.exports = function(ngModule){
	ngModule.controller('MarketingCreateCtrl', function(MarketingService, AppConfig, ModalService, $filter, Loader, $state, zone) {
		var vm  = this;
    vm.zone = zone;
		vm.marketing = {};
		_.extend(vm, {
			create: function() {
				Loader.show();
				MarketingService.create(vm.marketing).then(function() {
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
