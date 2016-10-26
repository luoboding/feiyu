"use strict";
module.exports = function(ngModule){
	ngModule.controller('NoticeCreateCtrl', function(noticeService, AppConfig, ModalService, $filter, Loader, zone, $stateParams, $state) {
		var vm  = this;
		vm.notice = {};
		vm.zone = zone;
		_.extend(vm, {
			create: function() {
				Loader.show();
				NoticeService.create(vm.notice).then(function() {
					Loader.hide();
					$state.go('app.notice.list');
				}, function(error) {
					Loader.hide();
					vm.error = error.response.error;
				});
      },
			types: $filter('noticeTypeFilter').searchOptions
		});
	});
};
