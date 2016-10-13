"use strict";
module.exports = function(ngModule){
	ngModule.controller('DealerListCtrl', function(ModalService, DealerService, AppConfig, $filter) {
		var vm = this;
		vm.searchParams = {};

		var getDealerList = function() {
			var parameterFilter = $filter('parameterFilter');
      var params = parameterFilter.getQueryParams(vm.searchParams, vm.pager);
			DealerService.getList(params).then(function(data) {
				if (data.status == 204) {

				} else {
					var result = data.response.data;
          vm.dealers = result.data;
          // vm.pager.page = vm.pager.page + 1;
          vm.pager.totalItems = result.data.length;
				}
			}, function(error) {
				// console.log(error.response.error);
				ModalService.alert(error.response.error)
			});
		};

		_.extend(vm, {
			viewDealer: function() {
				ModalService.show({
                    title: '注意事项',
                    okButtonLabel: '保存',
                    cancelButtonLabel: "取消",
                    cancelCls: 'btn btn-lg btn-primary',
                    okCls: 'btn btn-lg btn-primary',
                    html: require('./../templates/partials/edit-dealer.jade'),
                    controller: function($scope) {
                    }
                }).then(function () {
                    if(data.id) {
                        Exchange.updateNotices(data);
                    } else {
                        Exchange.createNotices(data);
                    }
                }, function(){
									alert('fff')
								});
			},
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
			}
		});
		this.search();
	});
};
