"use strict";
module.exports = function(ngModule){
	ngModule.controller('DealerEditCtrl', function(ModalService, DealerService, AppConfig, $filter, $state, $stateParams, Loader, dealer, level, responser) {
		var vm = this;
    vm.data = dealer;
		console.log('deaker', dealer);
		vm.level = level;
		vm.responser = responser;
		vm.location = {
			province: dealer.province,
			city: dealer.city,
			district: dealer.area
		};
		console.log('vm.location', vm.location);
		_.extend(vm, {
			edit: function() {
				Loader.show();
        var id = $stateParams.id;
				vm.data.province = vm.location.province;
				vm.data.city = vm.location.city;
				vm.data.area = vm.location.district;
				DealerService.update(id, vm.data).then(function() {
					Loader.hide();
          $state.go('app.dealer.list');
				}, function(error) {
					Loader.hide();
          vm.error = error.response.error;
				});
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
