"use strict";
module.exports = function(ngModule){
	ngModule.controller('ZoneListCtrl', function(ZoneService, AppConfig, ModalService, $filter, Loader, parent) {
		var vm  = this;
		vm.searchParams = {ispage: 1};
		vm.parent = parent;
		console.log('vm.parent', vm.parent)
		var getList = function() {
			var parameterFilter = $filter('parameterFilter');
			var params = parameterFilter.getQueryParams(vm.searchParams, vm.pager);
			Loader.show();
			ZoneService.list(params).then(function(data) {
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
					ZoneService.remove(id).then(function() {
						ModalService.popupMessage('删除成功').then(function(){
							vm.search();
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
