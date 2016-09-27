'use strict';
module.exports = function (ngModule) {
    ngModule.factory('GlobalInterceptor', function ($q, $injector, Storage) {
        return {
            request: function (config) {
                config = config || $q.when(config);
                var token = Storage.get('local', 'token');
                if (!token) {
                    window.location.hash = '';
                }
                if (token) {
                    config.headers['x-auth-token'] = token;
                }

                return config;
            },
            responseError: function(rejection){
                return $injector.invoke(function (Storage, $state) {
                    var status = rejection.status;
                    if (status === 403 || status === 401) {
                      Storage.remove('session', 'user');
                      $state.go('app.login');
                    }
                    return $q.reject(rejection);
                });
            }
        };
    });
};
