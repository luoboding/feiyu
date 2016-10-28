"use strict";
module.exports = function(ngModule){
	ngModule.controller('CaseEditCtrl', function(CaseService, AppConfig, ModalService, $filter, Loader, $stateParams, $state, showcase, zone) {
		var vm  = this;
		vm.data = showcase;
		vm.zone = zone;
		vm.file= {
			url: showcase.file,
			name: "下载"
		}
		vm.images = showcase.images.split(',');
		_.extend(vm, {
			edit: function() {
				Loader.show();
				vm.data.file = vm.file.url;
				vm.data.images = vm.images.join(',');
				CaseService.update($stateParams.id, vm.data).then(function() {
					Loader.hide();
					$state.go('app.case.list');
				}, function(error) {
					Loader.hide();
					vm.error = error.response.error;
				});
      },
			types: $filter('caseTypeFilter').searchOptions
		});
	});
};
