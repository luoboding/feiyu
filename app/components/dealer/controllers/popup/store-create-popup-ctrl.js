module.exports = function (ngModule) {
  ngModule.controller('StoreCreatePopupCtrl', function($modalInstance, $scope, $modalData, $filter) {
    var vm = this;
    vm.searchOptions = $filter('dealerStatusFilter').searchOptions
    console.log($modalData);
    vm.store = $modalData.store;
    console.log(vm.store);
    //overwirte
    $scope.disabledEmpty = function() {
      return $scope.modalForm.$valid;
    }
    $scope.ok = function() {
      $modalInstance.close(vm.store);
    };
  })
};
