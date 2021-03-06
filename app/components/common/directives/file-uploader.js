"use strict";

module.exports = function (ngModule) {
    ngModule.directive('fileUploader', function ($upload, $timeout, $filter) {
        return {
            restrict: 'EA',
            scope: {
                ngDisabled: '='
            },
            require: "?ngModel",
            replace: true,
            template: require('./../templates/file-uploader.jade'),
            link: function ($scope, $element, $attrs, ngModelCtrl) {

                var vm = $scope.vm = {};
                var model;
                var isObject = $attrs.isObject;
                vm.isButton = !!$attrs.isButton;
                vm.class = $attrs.subClass;
                vm.fileType = $attrs.fileType;

                var imgType = $attrs.imgType || 'thumbnail';
                vm.width = $attrs.width;

                vm.label = $attrs.label || $filter('translate')('upload');
                vm.errorMessage = $attrs.errorMessage || $filter('translate')('upload_failed');
                vm.uploadBtnPos = $attrs.uploadBtnPos || 'top';
                // vm.type = $attrs.acceptType || 'image/*';
                vm.uploadurl = $attrs.url || "url";

                vm.maxSize = $attrs.maxSize;
                $timeout(function () {
                    $element.find("input").attr("accept", vm.type);
                });

                var setModel = function (thumbnailUrl, fileName) {
                    if (fileName) {
                        $scope.model = {};
                        $scope.model.path = thumbnailUrl;
                        $scope.model.originName = fileName;
                        ngModelCtrl.$setViewValue($scope.model);
                    } else {
                        $scope.model = thumbnailUrl;
                        ngModelCtrl.$setViewValue(thumbnailUrl);
                    }

                    vm.loadThumbnailFile = null;
                };

                var uploadFile = function (file) {
                    var config = {
                        url: global.ENV.remoteHost + vm.uploadurl + "?type=" + vm.fileType,
                        file: file
                    };
                    return $upload.upload(config);
                };

                $scope.upload = function ($files) {
                    var file = $files[0];
                    if (!file) {
                        return;
                    }

                    //limit upload type
                    if(/.+\.(exe|dmg|bin|sh)$/gi.test(file.name)) {
                        return false;
                    }

                    if (file.size > vm.maxSize) {
                        vm.error = true;
                        // vm.errorMessage = "请上传文件大小在" + vm.maxSize / 1024 / 1024 + "MB以内的图片";
                        vm.error = $filter('transcombine')($filter('translate')('upload_size_limit'), [vm.maxSize / 1024 / 1024], '%@');
                        return;
                    }
                    vm.loadThumbnailFile = file;
                    ngModelCtrl.$setViewValue(null);//remove original model
                    uploadFile(file).then(function (response) {
                      console.log('response', response);
                      // setModel(response.data.data);
                        //var data = response.data.data;
                        if (!isObject) {
                            setModel(response.data.data.url);
                        } else {
                            setModel(response.data.data);
                        }
                        //setModel(data.server + data.filePhysicalName,data.width);
                        vm.error = false;
                    }, function (error) {
                        ngModelCtrl.$setViewValue($scope.tempModel);
                        vm.error = error.data.error;
                        return;
                    });
                };

                $scope.deleteThumbnail = function () {
                    setModel(null);
                    // TODO clear server img;
                };


                ngModelCtrl.$render = function () {
                    $scope.model = ngModelCtrl.$viewValue;
                    $scope.tempModel = ngModelCtrl.$viewValue;
                };
            }
        };
    });
};
