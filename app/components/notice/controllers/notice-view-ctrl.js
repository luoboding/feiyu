"use strict";
module.exports = function(ngModule){
	ngModule.controller('NoticeViewCtrl', function(NoticeService, AppConfig, ModalService, $filter, Loader, $stateParams, $state, notice, zone) {
		var vm  = this;
		vm.zone = zone;
		vm.data = notice;
		console.log(notice);
		vm.file= {
			url: notice.file,
			name: "下载"
		};

		_.extend(vm, {
			types: $filter('noticeTypeFilter').searchOptions
		});
	});
};
