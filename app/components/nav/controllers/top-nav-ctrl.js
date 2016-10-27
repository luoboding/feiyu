'use strict';

module.exports = function (ngModuel) {
    ngModuel.controller('TopNavCtrl', function ($location, $window, $rootScope, $stateParams, $state, Storage, User) {
        var vm = this;
        _.extend(vm, {
        	logout: function () {
        		User.logout().then(function (data) {
        			Storage.remove('local', 'x-auth-token');
            	$state.go('app.login');
        		}, function(error) {

        		})
        	}
        });
    });
};
