"use strict";
module.exports = function(ngModule){
	ngModule.controller('SettingDealerLevelEditCtrl', function(SettingDealerLevelService, AppConfig, ModalService, $filter) {
		var vm  = this;
		_.extend(vm, {
			update: function() {

      }
		});

		vm.search();
	});
};
