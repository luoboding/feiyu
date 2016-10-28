"use strict";
module.exports = function(ngModule){
	ngModule.controller('CaseListCtrl', function(CaseService, AppConfig, ModalService, $filter, Loader) {
		var vm  = this;
		vm.searchParams = {};
		var getList = function() {
			var parameterFilter = $filter('parameterFilter');
			vm.searchParams.startdate = $filter('date')(vm.start, "yyyy-MM-dd");
			vm.searchParams.enddate = $filter('date')(vm.end, "yyyy-MM-dd");
			var params = parameterFilter.getQueryParams(vm.searchParams, vm.pager);
			Loader.show();
			CaseService.list(params).then(function(data) {
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
			types: $filter('caseTypeFilter').searchOptions,
			typeFilter: function(type) {
				return $filter('caseTypeFilter').mapper[type];
			},
			statusFilter: function(status) {
				return $filter('caseStatusFilter').mapper[status];
			},
			wechatFilter: function(iswechat) {
				return $filter('casePublishTypeFilter').mapper[iswechat];
			},
			forceFilter: function(isforce) {
				return $filter('caseForceTypeFilter').mapper[isforce];
			},
			status: $filter("caseStatusFilter").searchOptions,
			search: function() {
				vm.pager.page = 1;
				getList();
			},
			remove: function(id) {
				ModalService.alert('确定要删除此记录?').then(function() {
          Loader.show();
					caseService.remove(id).then(function() {
            Loader.hide();
            ModalService.alert('删除成功').then(function(){
							vm.search();
						});
					}, function () {
						ModalService.popupMessage('删除失败');
					});
				});
			}
		});
		vm.search();
	});
};
