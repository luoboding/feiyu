"use strict";
module.exports = function(ngModule){
	ngModule.controller('NoticeCreateCtrl', function(NoticeService, AppConfig, ModalService, $filter, Loader, zone, $stateParams, $state) {
		var vm  = this;
		vm.data = {
			important: 0,
			inside: 0
		};
		vm.zone = zone;
		_.extend(vm, {
			create: function() {
				Loader.show();
				vm.data.file = vm.file.url;
				NoticeService.create(vm.data).then(function() {
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
