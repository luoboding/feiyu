'use strict';
var ngModule = angular.module('feiyu-project', [
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'pascalprecht.translate',
    'app.common',
    'app.nav',
    'app.auth',
    'app.dealer',
    'app.setting',
    'app.store',
    'app.area'
]);

ngModule.config(function ($locationProvider) {
    $locationProvider.html5Mode(false);
});

ngModule.config(function ($translateProvider) {
    $translateProvider.translations('zh', require('./../assets/locale/zh.yml'));
    $translateProvider.preferredLanguage('zh');
    $translateProvider.useSanitizeValueStrategy('escapeParameters');
});

ngModule.config(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
});

ngModule.config(function ($httpProvider) {
    $httpProvider.interceptors.push('GlobalInterceptor');
});

ngModule.run(function () {
});
