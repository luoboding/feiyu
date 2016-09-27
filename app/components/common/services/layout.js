'use strict';
module.exports = function(ngModule) {
    ngModule.service('Layout', function($rootScope) {
        return {
            noFrame: function ($scope) {
                $rootScope.noFrame = true;
                $scope.$on('$destroy', function () {
                    $rootScope.noFrame = false;
                });
            }
        };
    });
};
