module.exports = function (ngModule) {
  ngModule.controller('StoreCreatePopupCtrl', function($modalInstance, $scope, $modalData) {
    var vm = this;
    if ($modalData){
      vm.store = $modalData.store;
      vm.location = {
        province: vm.store.province,
        city: vm.store.city,
        district: vm.store.area
      };

      vm.sendLocation = {
        province: vm.store.sendprovince,
        city: vm.store.sendcity,
        district: vm.store.sendarea
      };
    }
    //overwirte
    $scope.disabledEmpty = function() {
      return $scope.modalForm.$valid;
    }

    $scope.ok = function() {
      vm.store.province = vm.location.province;
      vm.store.city = vm.location.city;
      vm.store.area = vm.location.district;
      vm.store.sendprovince = vm.sendLocation.province;
      vm.store.sendcity = vm.sendLocation.city;
      vm.store.sendarea = vm.sendLocation.district;
      $modalInstance.close(vm.store);
    };
  })
};
