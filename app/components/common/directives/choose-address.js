'use strict';
module.exports = function (ngModule) {
    ngModule.directive('chooseAddress', function (AreaService, $q, $rootScope) {
        return {
            restrict: 'EA',
            require: ["?ngModel", "?^form"],
            scope: true,
            replace: true,
            template: require('./../templates/choose-address.jade'),
            link: function ($scope, $element, $attrs, ctrls) {
                var ngModelCtrl = ctrls[0];
                var ngFormCtrl = ctrls[1];
                var name = $attrs.name;
                $scope.model = {};
                $scope.data = {};
                $scope.flags = {};
                var data = [{
                  name: "四川",
                  id: 1,
                  pid: 0
                },{
                  name: "山西",
                  id: 2,
                  pid: 0

                },
                {
                  name: '成都',
                  id: 3,
                  pid: 1
                },
                {
                  name: '武侯区',
                  id: 4,
                  pid: 3
                },
                {
                  name: '靖江区',
                  id: 5,
                  pid: 3
                },
                {
                  name: '成华区',
                  id: 6,
                  pid: 3
                }
              ];
                var init = function () {
                    // $scope.disabled = $attrs.disabled ? JSON.parse($attrs.disabled) : false;
                    // AreaService.list({ispage: 0, pid: 0}).then(function (data) {
                    //     $scope.data.provinces = data.response.data.data;
                    //     if (ngModelCtrl.$viewValue) {
                    //         setInitData();
                    //     }
                    // });
                  $scope.data.provinces = data.filter(function(item) {
                    return item.pid == 0;
                  })
                    if (ngModelCtrl.$viewValue) {
                        setInitData();
                    }

                    $attrs.$observe('required', function (value) {
                        if (value) {
                            //setValidity();
                        }
                    });
                };
                var loadCity = function (province) {
                        var deferred = $q.defer();
                        if (province) {
                          $scope.data.cities = data.filter(function(item) {
                            return item.pid == province.id;
                          });
                          $scope.flags.status = $scope.data.cities.length > 0;
                          if (!$scope.flags.status) ngModelCtrl.$setValidity('choose', true);
                          deferred.resolve();
                        } else {
                          $scope.data.cities = [];
                          deferred.reject();
                        }
                        return deferred.promise;
                    }, loadDistrict = function (city) {
                      var deferred = $q.defer();
                      if (city) {
                        $scope.data.districts = data.filter(function(item) {
                          return item.pid == city.id;
                          $scope.flags.status = $scope.data.cities.length > 0;
                          if (!$scope.flags.status) ngModelCtrl.$setValidity('choose', true);
                          deferred.resolve();
                        });
                      } else {
                        $scope.data.cities = [];
                        deferred.reject();
                      }
                      return deferred.promise;
                    },
                    loopData = function (dataName, loctionName) {
                        var deferred = $q.defer();
                        angular.forEach(data, function (item) {
                            if (item.id === ngModelCtrl.$viewValue[loctionName].id) {
                                deferred.resolve(item);
                            }
                        });
                        return deferred.promise;
                    }, setInitData = function () {
                        loopData('provinces', 'province').then(function (province) {

                            $scope.model.province = province;
                            loadCity($scope.model.province).then(function () {

                                loopData('cities', 'city').then(function (city) {
                                    $scope.model.city = city;
                                    console.log('citiss', $scope.data.cities);
                                    console.log('city', city);
                                    loadDistrict($scope.model.city).then(function () {
                                        loopData('districts', 'district').then(function (district) {
                                            $scope.model.district = district;
                                            $scope.districtChange();
                                        });
                                    });
                                });
                            }, function() {
                                $scope.provinceChange();
                            });
                        });

                    };


                $scope.model.isFieldValid = function (field) {
                    return ngFormCtrl[field].$dirty && !$scope.model[field];
                };

                $scope.provinceChange = function () {
                    console.log('$scope.model.province', $scope.model.province);
                    if (!$scope.model.province) {
                        delete $scope.model.province;
                        delete $scope.model.city;
                        delete $scope.model.district;
                        ngModelCtrl.$setViewValue(angular.copy($scope.model));
                    } else {
                        delete $scope.model.city;
                        delete $scope.model.district;
                        loadCity($scope.model.province);
                        ngModelCtrl.$setViewValue(angular.copy($scope.model));
                    }
                };

                $scope.cityChange = function () {
                    if (!$scope.model.city) {
                        delete $scope.model.city;
                        delete $scope.model.district;
                        ngModelCtrl.$setViewValue(angular.copy($scope.model));
                    } else {
                        delete $scope.model.district;
                        loadDistrict($scope.model.city);
                        ngModelCtrl.$setViewValue(angular.copy($scope.model));
                    }
                };

                $scope.districtChange = function () {
                    if (!$scope.model.district) {
                        delete $scope.model.district;
                        ngModelCtrl.$setViewValue(angular.copy($scope.model));
                    } else {
                        loadDistrict($scope.model.city);
                        ngModelCtrl.$setViewValue(angular.copy($scope.model));
                    }
                };

                $rootScope.$watch('currentLanguage', function(currentLanguage) {
                    $scope.currentLanguage = currentLanguage;
                })

                ngModelCtrl.$render = function () {
                    init();
                };
            }
        };
    });
};
