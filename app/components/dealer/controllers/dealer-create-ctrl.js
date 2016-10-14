"use strict";
module.exports = function(ngModule){
	ngModule.controller('DealerCreateCtrl', function(ModalService, DealerService, AppConfig, $filter, $state, Loader) {
		var vm = this;
		var init = function () {

		};
		_.extend(vm, {
			create: function() {
				Loader.show();
				DealerService.create(vm.data).then(function() {
					Loader.hide();
					ModalService.alert('添加成功').then(function() {
						$state.go('app.dealer.list');
					});
				}, function(error) {
					Loader.hide();
					ModalService.alert('添加失败')
				});
			}
    });
  });
};
