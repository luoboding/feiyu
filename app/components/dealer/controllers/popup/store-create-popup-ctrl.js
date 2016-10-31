module.exports = function (ngModule) {
  ngModule.controller('StoreCreatePopupCtrl', function($modalInstance, $scope, $modalData, $filter) {
    var vm = this;
    vm.searchOptions = $filter('dealerStatusFilter').searchOptions;
    vm.store = $modalData.store;
    vm.sendLocation = {
      province: vm.store.sendprovince,
      city: vm.store.sendcity,
      district: vm.store.sendarea
    };

    vm.location = {
      province: vm.store.province,
      city: vm.store.city,
      district: vm.store.area
    };
    //overwirte
    $scope.disabledEmpty = function() {
      return $scope.modalForm.$valid;
    };

    $scope.ok = function() {
      vm.store.sendprovince = vm.sendLocation.province;
      vm.store.sendcity = vm.sendLocation.city;
      vm.store.sendarea = vm.sendLocation.district;

      vm.store.province = vm.location.province;
      vm.store.city = vm.location.city;
      vm.store.area = vm.location.district;

      $modalInstance.close(vm.store);
    };
  });
};
