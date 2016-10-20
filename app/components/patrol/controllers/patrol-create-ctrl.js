"use strict";
module.exports = function(ngModule){
	ngModule.controller('PatrolCreateCtrl', function(PatrolService, AppConfig, ModalService, $filter, Loader, $stateParams, $state, zone) {
		var vm  = this;
		vm.data = {};
		vm.zone = zone;
		_.extend(vm, {
			create: function() {
				Loader.show();
				vm.data.patrolperson = vm.memberId.join(',');
				PatrolService.create(vm.data).then(function() {
					Loader.hide();
					$state.go('app.patrol.list');
				}, function(error) {
					Loader.hide();
					vm.error = error.response.error;
				});
      },
			addMember: function() {
				ModalService.show({
					title: '添加巡店人员',
          okButtonLabel: '添加',
          cancelButtonLabel: "取消",
          cancelCls: 'btn btn-lg btn-primary',
          okCls: 'btn btn-lg btn-primary',
          html: require('./../templates/popup/member-choose.jade'),
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
