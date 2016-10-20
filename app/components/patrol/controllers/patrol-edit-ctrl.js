"use strict";
module.exports = function(ngModule){
	ngModule.controller('PatrolEditCtrl', function(PatrolService, ModalService, $filter, Loader, $stateParams, $state, patrol, zone, responser) {
		var vm  = this;

		vm.data = patrol;
		vm.zone = zone;
		vm.members = [];
		vm.memberId = vm.data.patrolperson.split(',');
		for(var i = 0, length = responser.length; i<length; i++) {
			var id = responser[i].id;
			if (vm.memberId.indexOf(id) != -1) {
				vm.members.push(responser[i]);
			}
		}
		_.extend(vm, {
			edit: function() {
				Loader.show();
				vm.data.patrolperson = vm.memberId.join(',');
				PatrolService.update($stateParams.id, vm.data).then(function() {
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
					members: angular.copy(vm.members) || []
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
