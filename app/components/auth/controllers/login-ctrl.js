module.exports = function (ngModule) {
	"use strict";
	ngModule.controller("LoginCtrl", function ($state, $scope, Layout, User, $filter) {
		var vm = this;
		Layout.noFrame($scope);
	});
};