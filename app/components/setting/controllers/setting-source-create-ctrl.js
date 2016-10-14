"use strict";
module.exports = function(ngModule){
	ngModule.controller('SettingSourceCreateCtrl', function(SettingSourceService, AppConfig, ModalService, $filter, Loader, $stateParams, $state) {
		var vm  = this;
		vm.source = {};
		_.extend(vm, {
			create: function() {
				Loader.show();
        console.log(vm.source);
				SettingSourceService.create(vm.source).then(function() {
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
