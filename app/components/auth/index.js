'use strict';
var ngModule = angular.module('app.auth', ['app.common']);
require('./controllers/login-ctrl')(ngModule);

ngModule.config(function ($stateProvider) {
    $stateProvider.state('app.login', {
        url: '/login',
        views: {
          '@': {
            template: require('./templates/login.jade'),
            controller: 'LoginCtrl as vm'
          },
          'top_nav@': {
            template: null
          },
          'left_nav@': {
            template: null
          }
        }
    })
    .state('app.index', {
        url: '/index',
        views: {
          '@': {
            template: require('./templates/index.jade'),
          },
        }
    });
});
