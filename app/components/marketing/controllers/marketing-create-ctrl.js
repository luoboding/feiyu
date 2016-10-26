"use strict";
module.exports = function(ngModule){
	ngModule.controller('MarketingCreateCtrl', function($scope, MarketingService, AppConfig, ModalService, $filter, Loader, $state, zone) {
		var vm  = this;
    vm.zone = zone;
		vm.data = {};
		vm.start = new Date();
		var tomorrow = new Date();
  	tomorrow.setDate(tomorrow.getDate() + 1);
  	var afterTomorrow = new Date(tomorrow);
		vm.end = afterTomorrow;
		vm.images = [];

		$scope.$watch("vm.image", function(newValue, oldValue) {
			if (newValue) {
				vm.images.push(newValue);
			}
		});

		_.extend(vm, {
			create: function() {
				Loader.show();
				vm.data.startdate = $filter('date')(vm.start, 'yyyy-MM-dd');
				vm.data.enddate = $filter('date')(vm.end, 'yyyy-MM-dd');
				vm.data.file = vm.file.url;
				vm.data.images = vm.images.join(',');
				MarketingService.create(vm.data).then(function() {
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
