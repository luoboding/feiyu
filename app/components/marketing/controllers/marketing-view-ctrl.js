"use strict";
module.exports = function(ngModule){
	ngModule.controller('MarketingViewCtrl', function(MarketingService, AppConfig, ModalService, $filter, Loader, $stateParams, $state, marketing, zone) {
		var vm  = this;
		vm.data = marketing;
		vm.zone = zone;
		vm.file= {
			url: marketing.file,
			name: marketing.file_name ? marketing.file_name : "下载"
		}
		console.log('marketing', marketing);
		vm.start = new Date(marketing.startdate);
		vm.end = new Date(marketing.enddate);
		vm.images = marketing.images.split(',');
		_.extend(vm, {
			types: $filter('marketingTypeFilter').searchOptions
		});
	});
};
