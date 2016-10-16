"use strict";
module.exports = function(ngModule){
	ngModule.controller('DealerListCtrl', function(ModalService, DealerService, AppConfig, $filter, Loader, level) {
		var vm = this;
		vm.level = level;
		vm.searchParams = {};

		var getDealerList = function() {
			var parameterFilter = $filter('parameterFilter');
      var params = parameterFilter.getQueryParams(vm.searchParams, vm.pager);
			Loader.show();
			DealerService.list(params).then(function(data) {
				if (data.status == 204) {
				} else {
					var result = data.response.data;
          vm.list = result.data;
          vm.pager.total = result.data.length;
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
          getDealerList();
      },
			search: function() {
				vm.pager.page = 1;
				getDealerList();
			},
			filterStatus: function(status) {
				var statusArray = $filter('dealerStatusFilter').mapper;
				return statusArray[status];
			},
			remove: function(id) {
				ModalService.alert('确定要删除此记录?').then(function() {
					DealerService.remove(id).then(function() {
						ModalService.alert('删除成功').then(function(){
							vm.search();
						});
					}, function () {
						ModalService.alert('删除失败');
					});
				});
			},
			searchOptions: $filter('dealerStatusFilter').searchOptions
		});
		this.search();
	});
};
