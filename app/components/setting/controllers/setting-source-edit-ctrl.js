"use strict";
module.exports = function(ngModule){
	ngModule.controller('SettingSourceEditCtrl', function(SettingSourceService, AppConfig, ModalService, $filter, Loader, source, $stateParams, $state) {
		var vm  = this;
		vm.source = source;
		console.log(source)
		_.extend(vm, {
			update: function() {
				Loader.show();
				var id = $stateParams.id;
				SettingSourceService.update(id, vm.source).then(function() {
					Loader.hide();
					$state.go('app.setting.source.list');
				}, function(error) {
					Loader.hide();
					vm.error = error.response.error;
				});
      }
		});
	});
};
