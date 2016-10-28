"use strict";
module.exports = function(ngModule){
	ngModule.controller('CaseListCtrl', function(CaseService, AppConfig, ModalService, $filter, Loader) {
		var vm  = this;
		vm.searchParams = {};
		var getList = function() {
			var parameterFilter = $filter('parameterFilter');
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
			},
			view: function(id) {
				console.log(id);
				ModalService.show({
					title: '查看案例',
          okButtonLabel: '添加',
          cancelButtonLabel: "取消",
          cancelCls: 'btn btn-default',
          okCls: 'btn btn-primary',
          html: require('./../templates/popup/case-view.jade'),
          controller: "PopupCaseViewCtrl as vm",
					size: 'lg'
				}, {
					id: id
				});

			}
		});
		vm.search();
	});
};
