"use strict";
module.exports = function(ngModule){
	ngModule.controller('marketingEditCtrl', function(MarketingService, AppConfig, ModalService, $filter, Loader, $stateParams, $state, marketing) {
		var vm  = this;
		vm.data = marketing;
		vm.start = new Date(marketing.startdate);
		vm.end = new Date(marketing.enddate);
		_.extend(vm, {
			edit: function() {
				Loader.show();
				vm.data.startdate = new Date(vm.start).formatDate('yyyy-MM-dd');
				vm.data.enddate = new Date(vm.end).formatDate('yyyy-MM-dd');
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
