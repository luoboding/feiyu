"use strict";
module.exports = function(ngModule){
	ngModule.controller('DealerEditCtrl', function(ModalService, DealerService, AppConfig, $filter, $state, $stateParams, Loader, dealer, level, responser) {
		var vm = this;
    vm.data = dealer;
		vm.level = level;
		vm.responser = responser;
		vm.location = {
			province: {
				name: "四川",
				id: 1,
				pid: 0
			 },
			 city : {
				 name : "成都",
				 id: 3,
				 pid: 1
			 },
			 district: {
				 name : "武侯区",
				 id: 4, pid
				 : 3
			 }
		 };
		_.extend(vm, {
			edit: function() {
				Loader.show();
        var id = $stateParams.id;
				vm.data.province = vm.location.province.id;
				vm.data.city = vm.location.city.id;
				vm.data.area = vm.location.district.id;
				DealerService.update(id, vm.data).then(function() {
					Loader.hide();
          $state.go('app.dealer.list');
				}, function(error) {
					Loader.hide();
          vm.error = error.response.error;
				});
			}
    });
  });
};
