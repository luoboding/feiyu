"use strict";
module.exports = function(ngModule){
	ngModule.controller('NoticeEditCtrl', function(NoticeService, AppConfig, ModalService, $filter, Loader, $stateParams, $state, notice, zone) {
		var vm  = this;
		vm.zone = zone;
		vm.data = notice;
		console.log(notice);
		vm.file= {
			url: notice.file,
			name: "下载"
		}

		_.extend(vm, {
			edit: function() {
				Loader.show();
				vm.data.file = vm.file.url;
				NoticeService.update($stateParams.id, vm.data).then(function() {
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
