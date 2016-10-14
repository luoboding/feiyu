"use strict";
module.exports = function(ngModule){
	ngModule.controller('SettingDealerLevelListCtrl', function(SettingDealerLevelService, AppConfig, ModalService, $filter, Loader) {
		var vm  = this;
		vm.searchParams = {};
		var getList = function() {
			var parameterFilter = $filter('parameterFilter');
			var params = parameterFilter.getQueryParams(vm.searchParams, vm.pager);
			Loader.show();
			SettingDealerLevelService.list(params).then(function(data) {
				if (data.status == 204) {

				} else {
					var result = data.response.data;
          vm.list = result.data;
          vm.pager.totalItems = result.count;
				}
				Loader.hide();
			}, function(error) {
				Loader.hide();
				ModalService.alert(error.response.error)
			});
		};
		_.extend(vm, {
			pager: angular.copy(AppConfig.PAGER),
			pageChanged: function() {
          getList();
      },
			search: function() {
				vm.pager.page = 1;
				getList();
			},
			remove: function(id) {
				ModalService.alert('确定要删除此记录?').then(function() {
					SettingDealerLevelService.remove(id).then(function() {
						ModalService.popupMessage('删除成功').then(function(){
							location.reload();
						});
					}, function () {
						ModalService.popupMessage('删除失败');
					});
				}, function() {
					console.log('bad');
				});
			}
		});

		vm.search();
	});
};
