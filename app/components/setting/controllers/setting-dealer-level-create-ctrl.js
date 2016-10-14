"use strict";
module.exports = function(ngModule){
	ngModule.controller('SettingDealerLevelCreateCtrl', function(SettingDealerLevelService, AppConfig, ModalService, $filter, Loader, $stateParams, $state) {
		var vm  = this;
		vm.level = {};
		_.extend(vm, {
			create: function() {
				Loader.show();
				SettingDealerLevelService.create(vm.level).then(function() {
					Loader.hide();
					$state.go('app.setting.dealer-level.list');
				}, function(error) {
					Loader.hide();
					vm.error = error.response.error;
				});
      }
		});
	});
};
