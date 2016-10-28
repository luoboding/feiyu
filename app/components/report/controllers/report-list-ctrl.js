"use strict";
module.exports = function(ngModule){
	ngModule.controller('ReportListCtrl', function(ReportService, AppConfig, ModalService, $filter, Loader, manager, zone, store) {
		var vm  = this;
		vm.manager = manager;
		vm.zone = zone;
		vm.store = store;
		vm.searchParams = {};

		var getList = function() {
			var parameterFilter = $filter('parameterFilter');
			vm.searchParams.startdate = $filter('date')(vm.start, "yyyy-MM-dd");
			vm.searchParams.enddate = $filter('date')(vm.end, "yyyy-MM-dd");
			var params = parameterFilter.getQueryParams(vm.searchParams, vm.pager);
			Loader.show();
			ReportService.list(params).then(function(data) {
				var result = data.response.data;
        vm.list = result.data;
        vm.pager.total = result.count;
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
			types: $filter('reportTypeFilter').searchOptions,
			typeFilter: function(type) {
				return $filter('reportTypeFilter').mapper[type];
			},
			search: function() {
				vm.pager.page = 1;
				getList();
			},
			remove: function(id) {
				ModalService.alert('确定要删除此记录?').then(function() {
					reportService.remove(id).then(function() {
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
