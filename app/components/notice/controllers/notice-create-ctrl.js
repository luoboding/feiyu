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
				vm.data.patrolperson = vm.memberId.join(',');
				NoticeService.create(vm.data).then(function() {
					Loader.hide();
					$state.go('app.notice.list');
				}, function(error) {
					Loader.hide();
					vm.error = error.response.error;
				});
      },
			types: $filter('noticeTypeFilter').searchOptions,
			addMember: function() {
				ModalService.show({
					title: '添加巡店人员',
          okButtonLabel: '添加',
          cancelButtonLabel: "取消",
          cancelCls: 'btn btn-lg btn-primary',
          okCls: 'btn btn-lg btn-primary',
          html: require('./../../patrol/templates/popup/member-choose.jade'),
          controller: "MemberChoosePopupCtrl as vm",
				}, {
					members: vm.members || []
				}).then(function(data) {
					vm.members = data.members;
					vm.memberId = data.memberId;
				});
			},
			remove: function(index) {
				vm.memberId.splice(index, 1);
				vm.members.splice(index, 1);
			}
		});
	});
};