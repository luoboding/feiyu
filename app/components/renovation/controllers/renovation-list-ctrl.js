module.exports = function (ngModule) {
  ngModule.controller('RenovationListCtrl', function ($filter, Loader, ModalService, RenovationService, AppConfig, manager) {
    var vm  = this;
		vm.searchParams = {};
		var getList = function() {
			var parameterFilter = $filter('parameterFilter');
      if (vm.start) {
          vm.searchParams.start_time = new Date(vm.start).formatDate('yyyy-MM-dd');
      }

      if (vm.end) {
          vm.searchParams.end_time = new Date(vm.end).formatDate('yyyy-MM-dd');
      }

			var params = parameterFilter.getQueryParams(vm.searchParams, vm.pager);
			Loader.show();
			RenovationService.list(params).then(function(data) {
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
			search: function() {
				vm.pager.page = 1;
				getList();
			},
      filterStatus: function(status) {
				var statusArray = $filter('dealerStatusFilter').mapper;
				return statusArray[status];
			},
      statusOptions: $filter('dealerStatusFilter').searchOptions,
      manager: manager
    });

    vm.search();
  });
}
