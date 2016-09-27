'use strict';

module.exports = function (ngModule) {
    ngModule.constant("modalConfig", {
        "modalBodyTemplateUrl": "../templates/common-modal-body.jade",
        "templateData": {
            'template': require("../templates/common-modal-body.jade")
        }
    });
    ngModule.service("ModalService", /*@ngInject*/function ($uibModal, $templateCache, $q, $injector,$$stackedMap) {

        var self = this;

        var format = function (str, data) {
            var re = str;
            angular.forEach(data, function (item, index) {
                re = re.replace(new RegExp("<%\\s*" + index + "\\s*%>", "g"), item);
            });
            return re;
        };

        var promiseWarp = function (modalInstance) {
            var defer = $q.defer();
            modalInstance.result.then(function (result) {
                defer.resolve(result);
            }, function () {
                defer.reject(arguments);
            });
            return defer.promise;
        };

        this.show = function (modalOption, modalData) {

            if (modalOption) {
                var options = angular.extend({
                    okButtonLabel: modalOption.okButtonLabel || "确定",
                    cancelButtonLabel: modalOption.cancelButtonLabel || "取消",
                    cancelCls: modalOption.cancelCls || 'btn btn-lg btn-success',
                    okCls: modalOption.okCls || 'btn btn-lg btn-primary ok'
                }, modalOption);

                var modalInstance = $uibModal.open({
                    size: modalOption.size ? modalOption.size : '',
                    template: require("../templates/common-modal.jade"),
                    keyboard: true,
                    backdrop: 'static',
                    controller: function ($scope, $uibModalInstance, $compile, $controller, $http, modalData, modalConfig,$timeout) {
                        var modalScope = $scope;
                        var getResolvePromises = function (resolves) {
                            var promisesArr = [];
                            angular.forEach(resolves, function (value, key) {
                                if (angular.isFunction(value)) {
                                    promisesArr.push($q.when($injector.invoke(value)));
                                }
                            });
                            return promisesArr;
                        };

                        var render = function (body, content) {
                            body = angular.isFunction(body) ? body.call() : body;
                            content = angular.isFunction(content) ? content.call() : content;
                            var templateData = modalConfig.templateData;
                            templateData.template = content;
                            var template = format(body, templateData);
                            $scope.contentHtml = $compile(template)(modalScope);
                        };
                        var executeCtrl = function (variables) {
                            var ctrlLocals = {}, item = 0;
                            if (options.controller) {
                                ctrlLocals.$scope = modalScope;
                                ctrlLocals.$modalInstance = $uibModalInstance;
                                angular.forEach(modalData, function (value, key) {
                                    if (angular.isFunction(value) || angular.isArray(value)) {
                                        if (item < variables.length) {
                                            modalData[key] = variables[item];
                                            item += 1;
                                        }
                                    }
                                });
                                ctrlLocals.$modalData = modalData;
                                $controller(options.controller, ctrlLocals);
                            }
                        };

                        $scope.modalData = modalData;
                        $scope.options = options;

                        var modalBody = $q.defer();
                        var modalContent = $q.defer();

                        modalBody.resolve(require("../templates/common-modal-body.jade"));
                        if (options.url) {
                            $http.get(options.url, {cache: $templateCache})
                                .success(function (template) {
                                    modalContent.resolve(template);
                                });
                        } else if (options.html) {
                            modalContent.resolve(options.html);
                        } else {
                            modalContent.resolve('');
                        }

                        $q.all([modalBody.promise, modalContent.promise].concat(getResolvePromises(modalData)))
                            .then(function (tplAndVars) {
                                var variables = tplAndVars.slice(2);
                                setTimeout(function () {
                                    $scope.$apply(function () {
                                        executeCtrl(variables);
                                    });
                                }, 0);
                                render(tplAndVars[0], tplAndVars[1]);
                            });

                        $scope.ok = function () {
                            var result = angular.isFunction(modalScope.getResult) ? modalScope.getResult() : modalScope.getResult;
                            $uibModalInstance.close(result);
                            modalScope.$destroy();
                        };
                        if (!!options.disableBtn) {
                            $scope.disabledEmpty = options.disableBtn;
                        }
                        $scope.isOkDisabled = function (key, value) {
                            if (!key) {
                                return false;
                            }
                            if(angular.isFunction($scope.disabledEmpty)) {
                                return !$scope.disabledEmpty.call(this);
                            }
                            return !value;
                        };

                        $scope.close = function () {
                            $uibModalInstance.dismiss('close');
                            jQuery(".modal-footer .ok").removeAttr("disabled");
                            modalScope.$destroy();
                        };

                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                            jQuery(".modal-footer .ok").removeAttr("disabled");
                            modalScope.$destroy();
                        };

                    },
                    resolve: {
                        "modalData": function () {
                            return modalData;
                        }
                    },
                    windowClass: !!options.modalClass ? options.modalClass : ''
                });

                return promiseWarp(modalInstance);
            }
        };

        this.popupMessage = function (title, message, okCallback, cancelCallBack) {
            return self.show({
                title: title,
                tip: message,
                hideCancelBtn: !angular.isFunction(cancelCallBack),
                ok: okCallback,
                cancel: cancelCallBack
            });
        };

        this.alert = function (message) {
            return self.show({
                title: '提示信息',
                tip: '<div>' + message + '</div>',
                hideCancelBtn: true
            });
        };

        this.confirm = function (title, message) {
            return self.show({
                title: title,
                tip: '<div>' + message + '</div>'
            });
        };

        function calculatePos(outter, inner) {
            return outter / 2 - inner / 2;
        }
    });
};
