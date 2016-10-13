"use strict";
var ngModule = angular.module('app.dealer', ['app.common']);
require("./controllers/dealer-list-ctrl")(ngModule);
require("./controllers/dealer-create-ctrl")(ngModule);
require("./services/dealer-service")(ngModule);
require("./filters/dealer-status-filter")(ngModule);
ngModule.config(function ($stateProvider) {
    $stateProvider
    .state('app.dealer', {
        abstract: true
    })
    .state('app.dealer.list', {
        url: '/dealer',
        views: {
          '@': {
            template: require('./templates/dealer-list.jade'),
            controller: 'DealerListCtrl as vm'
          }
        }
    })
    .state('app.dealer.create', {
        url: '/dealer/create',
        views: {
          '@': {
            template: require('./templates/dealer-create.jade'),
            controller: 'DealerCreateCtrl as vm'
          }
        }
    })
});
