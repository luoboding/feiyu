"use strict";
module.exports = function(ngModule){
	ngModule.controller('DealerCreateCtrl', function(ModalService, DealerService, AppConfig, $filter, $state) {
		var vm = this;
		var init = function () {

		};
		_.extend(vm, {
			create: function() {
				DealerService.create(vm.data).then(function() {
					ModalService.alert('添加成功').then(function() {
						$state.go('app.dealer.list');
					});
				}, function() {
					ModalService.alert('添加失败')
				});
			}
    });
  });
};
