'use strict';

module.exports = function (ngModuel) {
    ngModuel.controller('LeftNavCtrl', function ($location, $window, $rootScope, $stateParams, $state, $scope, Nav) {
        var vm = this;
        _.extend(vm, {
            showMenuBar: function (moduleName) {
                vm.active = moduleName;
            }
        });
        $scope.$on('$stateChangeSuccess', function () {
            var url = $location.$$path.split('/')[1];
            vm.active = url;
        });
    });
};
