"use strict";
module.exports = function(ngModule){
	ngModule.controller('MarketingCreateCtrl', function(MarketingService, AppConfig, ModalService, $filter, Loader, $state, zone) {
		var vm  = this;
    vm.zone = zone;
		vm.marketing = {};
		vm.start = new Date();
		var tomorrow = new Date();
  	tomorrow.setDate(tomorrow.getDate() + 1);
  	var afterTomorrow = new Date(tomorrow);
		vm.end = afterTomorrow;

		_.extend(vm, {
			create: function() {
				Loader.show();
				vm.data.startdate = new Date(vm.start).formatDate('yyyy-MM-dd');
				vm.data.enddate = new Date(vm.end).formatDate('yyyy-MM-dd');
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
