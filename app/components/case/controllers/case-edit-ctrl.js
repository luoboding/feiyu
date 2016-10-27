"use strict";
module.exports = function(ngModule){
	ngModule.controller('MarketingEditCtrl', function(MarketingService, AppConfig, ModalService, $filter, Loader, $stateParams, $state, marketing, zone) {
		var vm  = this;
		vm.data = marketing;
		vm.zone = zone;
		vm.file= {
			url: marketing.file,
			name: "下载"
		}
		console.log('marketing', marketing);
		vm.start = new Date(marketing.startdate);
		vm.end = new Date(marketing.enddate);
		vm.images = marketing.images.split(',');
		_.extend(vm, {
			edit: function() {
				Loader.show();
				vm.data.startdate = $filter('date')(vm.start, 'yyyy-MM-dd');
				vm.data.enddate = $filter('date')(vm.end, 'yyyy-MM-dd');
				vm.data.file = vm.file.url;
				vm.data.images = vm.images.join(',');
				marketingService.update($stateParams.id, vm.data).then(function() {
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
