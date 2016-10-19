module.exports = function (ngModule) {
  ngModule.controller('StoreCreatePopupCtrl', function($modalInstance, $scope, $modalData) {
    var vm = this;
    vm.store = $modalData.store || {};
    //overwirte
    $scope.disabledEmpty = function() {
      return $scope.modalForm.$valid;
    }

    $scope.ok = function() {
      $modalInstance.close(vm.store);
    };
  })
};
