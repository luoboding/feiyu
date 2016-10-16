module.exports = function (ngModule) {
  ngModule.controller('StoreCreatePopupCtrl', function($modalInstance, $scope, $modalData) {
    console.log($modalInstance);
    console.log('modalData', $modalData);
    var vm = this;
    if ($modalData){
      vm.store = $modalData.store;
      vm.location = $modalData.location;
      vm.sendLocation = $modalData.sendLocation;
    }
    $scope.ok = function() {
      $modalInstance.close(vm);
    };
  })
};
