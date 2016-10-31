'use strict';

module.exports = function (ngModuel) {
    ngModuel.controller('LeftNavCtrl', function ($location, $window, $rootScope, $stateParams, $state, $scope, Nav) {
        var vm = this;
        _.extend(vm, {
            showMenuBar: function (moduleName) {
                vm.active = moduleName;
            },
            showSettingSubMenus: function() {
              vm.isSettingSubMenusShow = !vm.isSettingSubMenusShow;
            }
        });
        var settingUrl = function () {
          var locations = $location.$$path.split('/');
          if (locations[1] == "setting") {
            vm.isSettingSubMenusShow = true;
            vm.url = locations[2];
          } else {
            vm.url = locations[1];
          }
        }
        $scope.$on('$stateChangeSuccess', function () {
          settingUrl();
        });
        settingUrl();
    });
};
