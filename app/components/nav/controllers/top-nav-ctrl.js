'use strict';

module.exports = function (ngModuel) {
    ngModuel.controller('TopNavCtrl', function ($location, $window, $rootScope, $stateParams, $state, Storage) {
        var vm = this;
        vm.logout = function () {
            Storage.remove('local', 'token');
            $state.go('app.login');
        };
    });
};
