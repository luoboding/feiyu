'use strict';
module.exports = function(ngModel) {
    ngModel.directive('chooseCategory', function($http, HttpResource) {
        return {
            restrict: 'EA',
            scope: {
                ngDisabled: '=?'
            },
            require: "?ngModel",
            replace: true,
            template: require('../templates/choose-category.jade'),
            link: function ($scope, $element, $attrs, ngModelCtrl) {
                var vm = $scope.vm = {};

                $scope.model = {};
                $scope.data = {};

                $scope.ngSelectedData = $scope.ngSelectedData || [];
                var init  = function () {
                    HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'categories/tree')).then(function(categories) {
                        var categoryList = categories.response.pageList;
                        $scope.data.categoryList = [
                            {
                                model: null,
                                data: categoryList
                            }
                        ];

                        if (ngModelCtrl.$viewValue) {
                            setInitData();
                        }
                    }, function() {
                        //TODO handle error
                    });
                };

                var setInitData = function () {
                    var receiveData = ngModelCtrl.$viewValue;
                    var loopData = $scope.data.categoryList[0].data;
                    angular.forEach([receiveData], function (data, index) {
                        var currentModel = _.find(loopData, function (category) {
                            return category.id == data.id;
                        });
                        $scope.data.categoryList[index].model = currentModel;
                    });
                    setNgModel();
                };

                $scope.changeOption = function (category, index) {
                    $scope.ngSelectedData[index] = category.model;
                    //first level, if not, we won't display it
                    if (!category.model || !category.model.children.length) {
                        $scope.ngSelectedData.splice(index);
                        $scope.data.categoryList.splice(index + 1, $scope.data.categoryList.length);
                    }
                    setNgModel();
                };

                var setNgModel = function () {
                    var categoryNext = getLastCategory();
                    if (categoryNext) {
                        ngModelCtrl.$setViewValue(categoryNext);
                    }
                };

                var getLastCategory = function () {
                    var length = $scope.data.categoryList.length;
                    var category = $scope.data.categoryList[length - 1].model ? $scope.data.categoryList[length - 1].model : {};
                    return category;
                };
                ngModelCtrl.$render = function () {
                    init();
                };

            }
        };
    });
};
