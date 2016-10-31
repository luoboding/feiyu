module.exports = function(ngModule) {
  ngModule.controller('ZoneChoosePopupCtrl', function($scope, $modalInstance, ZoneService, $modalData) {
    var vm = this;
    try {
      vm.zones = $modalData.zones;
    } catch (e) {
      vm.zones = [];
    }

    var init = function () {
      ZoneService.list({ispage: 0}).then(function(data) {
        vm.list = data.response.data.data;
      });
    };

    $scope.disabledEmpty = function() {
      return $scope.modalForm.$valid;
    };

    $scope.ok = function() {
      $modalInstance.close(vm.zones);
    };

    init();
  });
};
