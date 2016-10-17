'use strict';
module.exports = function (ngModule) {
	ngModule.directive('chooseAddress', function(AreaService,$q){
    return {
        restrict: 'EA',
        require: "?ngModel",
        scope : true,
        replace: true,
		template: require('./../templates/choose-address.jade'),
        link: function ($scope, $element, $attrs , ngModelCtrl ){

            var name = $attrs.name;
            $scope.model = {};
            $scope.data = {};
            $scope.flags = {};

            var init = function(){
                AreaService.list({ispage: 0, pid: 0}).then(function(provinces){
                    $scope.data.provinces = provinces.response.data.data;
                    if(ngModelCtrl.$viewValue){
                        setInitData();
                    }
                });

                $attrs.$observe('required',function(value){
                    if(value){
                        setValidity();
                    }
                });
            };

            var loadCity = function(province){
                var deferred = $q.defer();
                AreaService.list({ispage: 0, pid: province.id}).then(function(cities){
                    $scope.data.cities = cities.response.data.data;
                    deferred.resolve();
                });
                return deferred.promise;

            },loadDistrict = function(city){
                var deferred = $q.defer();
                AreaService.list({ispage: 0, pid: city.id}).then(function(districts){
                    $scope.data.districts = districts.response.data.data;
                    console.log($scope.data.districts);
                    $scope.flags.status = districts.response.data.data.length > 0;
                    if(!$scope.flags.status) ngModelCtrl.$setValidity('choose',true);
                    deferred.resolve();
                });
                return deferred.promise;
            },loopData = function(dataName,loctionName){
                var deferred = $q.defer();
                angular.forEach($scope.data[dataName],function(item){
                    if( item.id === ngModelCtrl.$viewValue[loctionName]){
                        deferred.resolve(item);
                    }
                });
                return deferred.promise;
            },setInitData = function(){
                loopData('provinces','province').then(function(province){
                    $scope.model.province = province;
                    loadCity($scope.model.province).then(function(){
                        loopData('cities','city').then(function(city){
                            $scope.model.city = city;
                            loadDistrict($scope.model.city).then(function(){
                                loopData('districts','district').then(function(district){
                                    $scope.model.district = district;
                                    $scope.districtChange();
                                });
                            });
                        });
                    });
                });

            };

            var checkValidate = function(){
               setValidity();
            };

            var setValidity = function(){
                ngModelCtrl.$setValidity('choose',!!$scope.model.district);
            };

            $scope.provinceChange = function (){
                if(!$scope.model.province){
                    delete $scope.model.province;
                    delete $scope.model.city;
                    delete $scope.model.district;
                    ngModelCtrl.$setViewValue(angular.copy($scope.model));
                    checkValidate();
//                    ngModelCtrl.$setValidity('choose',true); //to ensure ng-valid-choose when only choose province
                }else{
                    delete $scope.model.city;
                    delete $scope.model.district;
                    loadCity($scope.model.province);
                    ngModelCtrl.$setViewValue(angular.copy($scope.model));
                    checkValidate();
                }
            };

            $scope.cityChange = function(){
                if(!$scope.model.city){
                    delete $scope.model.city;
                    delete $scope.model.district;
                    ngModelCtrl.$setViewValue(angular.copy($scope.model));
                }else{
                    delete $scope.model.district;
                    loadDistrict($scope.model.city);
                    ngModelCtrl.$setViewValue(angular.copy($scope.model));
                    checkValidate();
                }
            };

            $scope.districtChange = function () {
                ngModelCtrl.$setViewValue(angular.copy($scope.model));
                checkValidate();
            };

            ngModelCtrl.$render = function(){
                init();
            };
        }
    };
});
};
