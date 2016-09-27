'use strict';
module.exports = function(ngModel) {
    ngModel.directive('chooseMutibleCategory', function($http, HttpResource) {
        return {
            restrict: 'EA',
            scope: {
                ngDisabled: '=?'
            },
            require: "?ngModel",
            replace: true,
            template: require('../templates/choose-mutible-category.jade'),
            link: function ($scope, $element, $attrs, ngModelCtrl) {
                $scope.data = {};
                //first of all, contruct list based on numbers of ngModel
                var init  = function () {
                    HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'categories/tree')).then(function(categories) {
                        var categoryList = categories.response.pageList;
                        $scope.data.categoryList = categoryList;
                        if (ngModelCtrl.$viewValue) {
                            $scope.data.model = ngModelCtrl.$viewValue;
                            setInitData();
                        }
                    });
                };

                var setInitData = function () {
                    var loopData = $scope.data.categoryList;
                    angular.forEach(loopData, function(parent) {
                        if(parent.hasOwnProperty('children') && parent.children.length > 0) {
                            angular.forEach(parent.children, function(child) {
                                if ($scope.data.model.indexOf(child.id) >= 0) {
                                    child.selected = true;
                                }
                            });
                        }
                    });
                    setNgModel();
                };
                $scope.select = function(id) {
                    if ($scope.data.model.indexOf(id) < 0) {
                        $scope.data.model.push(id);
                    } else {
                        $scope.data.model.splice($scope.data.model.indexOf(id), 1);
                    }
                    setNgModel();
                };
                var setNgModel = function () {
                    ngModelCtrl.$setViewValue($scope.data.model);
                };
                ngModelCtrl.$render = function () {
                    init();
                };

            }
        };
    });
};
