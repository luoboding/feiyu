"use strict";
module.exports = function(ngModule){
	ngModule.controller('SettingDealerLevelEditCtrl', function(SettingDealerLevelService, AppConfig, ModalService, $filter, Loader, level, $stateParams, $state) {
		var vm  = this;
		vm.level = level;
		_.extend(vm, {
			update: function() {
				Loader.show();
				var id = $stateParams.id;
				SettingDealerLevelService.update(id, vm.level).then(function() {
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
