'use strict';

module.exports = function (ngModuel) {
    ngModuel.controller('LeftNavCtrl', function ($location, $window, $rootScope, $stateParams, $state, $scope, Nav) {
        var vm = this;
        var getExchangeNum = function () {
            Nav.getExchangeNum().then(function (d) {
                vm.exchangeNum = d.response;
            });
        };
        _.extend(vm, {
            exchangeNum: 0,
            statisticsMenu: Nav.getStatisticsMenu(),
            exchangeMenu: Nav.getExchangeMenu(),
            showMenuBar: function (moduleName) {
                vm.active = moduleName;
            }
        });
        $scope.$on('$stateChangeSuccess', function () {
            var url = $location.$$path.split('/')[1];
            vm.active = url;
        });
        getExchangeNum();
    });
};
