"use strict";
module.exports = function(ngModule){
	ngModule.controller('DealerCreateCtrl', function(ModalService, DealerService, AppConfig, $filter, $state, Loader, level, responser, $scope) {
		var vm = this;
		vm.level = level;
		vm.responser = responser;
		vm.data = {
			store: []
		};
		vm.joindate = new Date();
		_.extend(vm, {
			create: function() {
				Loader.show();
				vm.data.province = vm.location.province;
				vm.data.city = vm.location.city;
				vm.data.area = vm.location.district;
				vm.data.joindate = new Date(vm.joindate).formatDate('yyyy-MM-dd');
				DealerService.create(vm.data).then(function() {
					Loader.hide();
					$state.go('app.dealer.list');
				}, function(error) {
					Loader.hide();
					vm.error = error.response.error;
				});
			},
			addStore: function() {
				ModalService.show({
          title: '添加门店',
          okButtonLabel: '添加',
          cancelButtonLabel: "取消",
          cancelCls: 'btn btn-default',
          okCls: 'btn btn-primary',
          html: require('./../templates/popup/store-create.jade'),
          controller: "StoreCreatePopupCtrl as vm",
					size: 'lg'
				}, {store: {}}).then(function(store) {
					vm.data.store.push(store);
				}, function(error) {
				});
			},
			filterStatus: function(status) {
				var statusArray = $filter('dealerStatusFilter').mapper;
				return statusArray[status];
			},
			editStore: function(index) {
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
					store: vm.data.store[index]
				}).then(function(store) {
					vm.data.store.splice(index, 1, store);
				});
			},
			removeStore: function(index) {
				vm.data.store.splice(index, 1);
			}
    });
  });
};
