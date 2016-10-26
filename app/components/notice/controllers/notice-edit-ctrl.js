"use strict";
module.exports = function(ngModule){
	ngModule.controller('NoticeEditCtrl', function(NoticeService, AppConfig, ModalService, $filter, Loader, $stateParams, $state, notice, zone) {
		var vm  = this;
		vm.zone = zone;
		vm.notice = notice;
		_.extend(vm, {
			edit: function() {
				Loader.show();
				NoticeService.update($stateParams.id, vm.notice).then(function() {
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
