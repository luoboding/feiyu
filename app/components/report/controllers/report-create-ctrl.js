"use strict";
module.exports = function(ngModule){
	ngModule.controller('ReportCreateCtrl', function(ReportService, AppConfig, ModalService, $filter, Loader, $stateParams, $state, dealer, belong, $scope) {
		var vm  = this;
		vm.dealer = dealer;
		vm.images = [];
		$scope.$watch("vm.image", function(newValue, oldValue) {
			if (newValue) {
				vm.images.push(newValue);
			}
		});

		_.extend(vm, {
			create: function() {
				Loader.show();
				vm.data.images = vm.images.join(',');
				// consoe.log(vm.data);
				// return;
				ReportService.create(vm.data).then(function() {
					Loader.hide();
					$state.go('app.report.list');
				}, function(error) {
					Loader.hide();
					vm.error = error.response.error;
				});
      },
			dealerChanged: function(item) {
				for(var i = 0, length = dealer.length; i < length; i++) {
					if (dealer[i].id == vm.data.dealer_id) {
						vm.selectedDealer = dealer[i];
						return;
					}
				}
			},
			types: $filter('reportTypeFilter').searchOptions,
			belongStatus: $filter('reportBelongTypeFilter').searchOptions,
			belongChanged: function() {
				vm.programs = [];
				for (var i = 0, length = belong.length; i < length; i++) {
					if (belong[i].type == vm.data.belong) {
						vm.programs.push(belong[i]);
					}
				}
			}
		});
	});
};
