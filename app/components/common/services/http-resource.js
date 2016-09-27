'use strict';
module.exports = function (ngModule) {
    ngModule.service('HttpResource', function ($q) {
        this.deferWrap = function (request) {
            var defer = $q.defer();
            request.success(function (response, status, header) {
                var data = {
                    response: response,
                    status: status,
                    header: header
                };
                defer.resolve(data);
            }).error(function (error, status, header) {
                var data = {
                    response: error,
                    status: status,
                    header: header
                };
                defer.reject(data);
            });
            return defer.promise;
        };
        return this;
    });
};
