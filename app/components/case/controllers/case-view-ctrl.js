"use strict";
module.exports = function(ngModule){
	ngModule.controller('CaseViewCtrl', function(CaseService, AppConfig, ModalService, $filter, Loader, $stateParams, $state, showcase) {
		var vm  = this;
		vm.data = showcase;
		vm.file= {
			url: showcase.file,
			name: "下载"
		}
		vm.images = showcase.images.split(',');
		_.extend(vm, {
			edit: function() {
				Loader.show();
				vm.data.images = vm.images.join(',');
				CaseService.update($stateParams.id, vm.data).then(function() {
					Loader.hide();
					$state.go('app.case.list');
				}, function(error) {
					Loader.hide();
					vm.error = error.response.error;
				});
      }
		});
	});
};
