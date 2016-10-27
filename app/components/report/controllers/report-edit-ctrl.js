"use strict";
module.exports = function(ngModule){
	ngModule.controller('ReportEditCtrl', function(ReportService, AppConfig, ModalService, $filter, Loader, $stateParams, $state, report, zone) {
		var vm  = this;
		vm.data = report;
		_.extend(vm, {
			edit: function() {
				Loader.show();
				vm.data.patrolperson = vm.memberId.join(',');
				ReportService.update($stateParams.id, vm.data).then(function() {
					Loader.hide();
					$state.go('app.report.list');
				}, function(error) {
					Loader.hide();
					vm.error = error.response.error;
				});
      },
			types: $filter('reportTypeFilter').searchOptions
		});
	});
};
