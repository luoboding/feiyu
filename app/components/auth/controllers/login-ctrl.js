module.exports = function (ngModule) {
	"use strict";
	ngModule.controller("LoginCtrl", function ($state, $scope, Layout, User, $filter) {
		Layout.noFrame($scope);
		var vm = this;
		_.extend(vm, {
			login: function () {
				console.log(vm.password, vm.username);
				User.login(vm.username, vm.password).then(function (data) {
					console.log('data', data);
				}, function (error) {

				});
			}
		})
	});
};