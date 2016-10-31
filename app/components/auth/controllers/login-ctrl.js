module.exports = function (ngModule) {
	"use strict";
	ngModule.controller("LoginCtrl", function ($state, $scope, Layout, User, $filter, Storage) {
		Layout.noFrame($scope);
		var vm = this;
		_.extend(vm, {
			login: function () {
				console.log(vm.password, vm.username);
				User.login(vm.username, vm.password).then(function (data) {

					var token = data.response.data.token;

					Storage.set('local', 'x-auth-token', token);
					$state.go('app.index');

				}, function (error) {
					vm.error = error.response.error;
				});
			}
		});
	});
};
