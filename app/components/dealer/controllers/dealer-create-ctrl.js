"use strict";
module.exports = function(ngModule){
	ngModule.controller('DealerCreateCtrl', function(ModalService, DealerService, AppConfig, $filter, $state, Loader, level, responser) {
		var vm = this;
		vm.level = level;
		vm.responser = responser;
		vm.data = {
			store: []
		};
		_.extend(vm, {
			create: function() {
				Loader.show();
				vm.data.province = vm.location.province.id;
				vm.data.city = vm.location.city.id;
				vm.data.area = vm.location.district.id;
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
          cancelCls: 'btn btn-lg btn-primary',
          okCls: 'btn btn-lg btn-primary',
          html: require('./../templates/popup/store-create.jade'),
          controller: "StoreCreatePopupCtrl as vm",
					size: 'lg'
				}).then(function(data) {

					vm.storeLocation = data.location;
					vm.storeSendLocation = data.sendLocation;

					var store = angular.copy(data.store);

					store.province = data.location.province.id;
					store.city = data.location.city.id;
					store.area = data.location.district.id;

					store.sendprovince = data.sendLocation.province.id;
					store.sendcity = data.sendLocation.city.id;
					store.sendarea = data.sendLocation.district.id;
					vm.data.store.push(store);

					console.log('data', vm.data);
				}, function(error) {

				})
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
					store: vm.data.store[index],
					location: vm.storeLocation,
					sendLocation: vm.storeSendLocation
				}).then(function() {
					vm.storeLocation = data.location;
					vm.storeSendLocation = data.sendLocation;

					var store = angular.copy(data.store);

					store.province = data.location.province.id;
					store.city = data.location.city.id;
					store.area = data.location.district.id;

					store.sendprovince = data.sendLocation.province.id;
					store.sendcity = data.sendLocation.city.id;
					store.sendarea = data.sendLocation.district.id;
					vm.data.store.splice(index, 1, store);
				});
			},
			removeStore: function(index) {
				vm.data.store.splice(index, 1);
			}
    });
  });
};
