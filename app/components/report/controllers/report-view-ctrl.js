"use strict";
module.exports = function(ngModule){
	ngModule.controller('ReportViewCtrl', function(ReportService, AppConfig, ModalService, $filter, Loader, $stateParams, $state, report, dealer, belong, $scope) {
		var vm  = this;
		vm.data = report;
		vm.dealer = dealer;
		try {
				vm.images = vm.data.images.split(',');
		} catch (e) {
			vm.images = [];
		}

		$scope.$watch("vm.image", function(newValue, oldValue) {
			if (newValue) {
				vm.images.push(newValue);
			}
		});

		_.extend(vm, {
			edit: function() {
				Loader.show();
				vm.data.images = vm.images.join(',');
				ReportService.update($stateParams.id, vm.data).then(function() {
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
			belongChanged: function() {
				vm.programs = [];
				for (var i = 0, length = belong.length; i < length; i++) {
					if (belong[i].type == vm.data.belong) {
						vm.programs.push(belong[i]);
					}
				}
			},
			types: $filter('reportTypeFilter').searchOptions,
			belongStatus: $filter('reportBelongTypeFilter').searchOptions
		});
		vm.belongChanged();
		vm.dealerChanged();
	});
};
