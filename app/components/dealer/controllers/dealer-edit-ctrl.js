"use strict";
module.exports = function(ngModule){
	ngModule.controller('DealerEditCtrl', function(ModalService, DealerService, StoreService, AppConfig, $filter, $state, $stateParams, Loader, dealer, level, responser, StoreDecrationStatus) {
		var vm = this;
    vm.data = dealer;
		vm.level = level;
		vm.responser = responser;
		vm.joindate = new Date(vm.data.joindate);
		vm.location = {
			province: dealer.province,
			city: dealer.city,
			district: dealer.area
		};
		_.extend(vm, {
			edit: function() {
				Loader.show();
        var id = $stateParams.id;
				vm.data.province = vm.location.province;
				vm.data.city = vm.location.city;
				vm.data.area = vm.location.district;
				vm.data.joindate = $filter('date')(vm.joindate, "yyyy-MM-dd");
				DealerService.update(id, vm.data).then(function() {
					Loader.hide();
          $state.go('app.dealer.list');
				}, function(error) {
					Loader.hide();
          vm.error = error.response.error;
				});
			},
			filterStatus: function(status) {
				var statusArray = $filter('dealerStatusFilter').mapper;
				return statusArray[status];
			},
			addStore: function() {
				ModalService.show({
					title: '添加门店',
					okButtonLabel: '添加',
					cancelButtonLabel: "取消",
					cancelCls: 'btn btn-lg btn-primary',
					okCls: 'btn btn-lg btn-primary',
					html: require('./../templates/popup/store-create.jade'),
					controller: "StoreCreatePopupCtrl as vm",
					size: 'lg'
				}, {
					store: {dealer_id: dealer.id}
				}).then(function(store) {
					Loader.show();
					StoreService.create(store).then(function (data) {
						Loader.hide();
						vm.data.store.push(data.response.data.data);
					}, function(error) {
						Loader.hide();
						ModalService.alert(error.response.error);
					});
				});
			},
			editStore: function(index) {
				ModalService.show({
          title: '编辑门店',
          okButtonLabel: '确定',
          cancelButtonLabel: "取消",
          cancelCls: 'btn btn-lg btn-primary',
          okCls: 'btn btn-lg btn-primary',
          html: require('./../templates/popup/store-create.jade'),
          controller: "StoreCreatePopupCtrl as vm",
					size: 'lg'
				}, {
					store: vm.data.store[index]
				}).then(function(store) {
					Loader.show();
					StoreService.update(store.id, store).then(function () {
						Loader.hide();
						vm.data.store.splice(index, 1, store);
					}, function(error) {
						Loader.hide();
						ModalService.alert(error.response.error);
					});
				});
			},
			startDecorate: function(index) {
				var store = vm.data.store[index];
				var copiedStore = angular.copy(store);
				copiedStore.status = StoreDecrationStatus.start;
				ModalService.alert('确定发起装修?').then(function () {
					Loader.show();
					StoreService.update(copiedStore.id, copiedStore).then(function() {
						Loader.hide();
						store.status = StoreDecrationStatus.start;
					});
				});
			}
    });
  });
};
