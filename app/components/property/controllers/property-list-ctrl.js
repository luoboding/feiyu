"use strict";
module.exports = function(ngModule){
	ngModule.controller('PropertyListCtrl', function(PropertyService, AppConfig, ModalService, $filter, Loader) {
		var vm  = this;
		vm.searchParams = {};
		var getList = function() {
			var parameterFilter = $filter('parameterFilter');
			var params = parameterFilter.getQueryParams(vm.searchParams, vm.pager);
			Loader.show();
			PropertyService.list(params).then(function(data) {

				var result = data.response.data;
        vm.list = result.data;
        vm.pager.total = result.count;
				Loader.hide();
			}, function(error) {
				Loader.hide();
				ModalService.alert(error.response.error);
			});
		};
		_.extend(vm, {
			pager: angular.copy(AppConfig.PAGER),
			pageChanged: function() {
          getList();
      },
			types: $filter('PropertyTypeFilter').searchOptions,
			typeFilter: function(type) {
				return $filter('PropertyTypeFilter').mapper[type];
			},
			search: function() {
				vm.pager.page = 1;
				getList();
			},
			remove: function(id) {
				ModalService.alert('确定要删除此记录?').then(function() {
					PropertyService.remove(id).then(function() {
						ModalService.alert('删除成功').then(function(){
							vm.search();
						});
					}, function () {
						ModalService.alert('删除失败');
					});
				}, function() {
					console.log('bad');
				});
			}
		});

		vm.search();
	});
};
