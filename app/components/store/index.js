"use strict";
var ngModule = angular.module('app.store', ['app.common']);
require("./controllers/store-list-ctrl")(ngModule);
ngModule.config(function ($stateProvider) {
    $stateProvider
    .state('app.store', {
        abstract: true
    })
    .state('app.store.list', {
        url: '/store',
        views: {
          '@': {
            template: require('./templates/store-list.jade'),
            controller: 'StoreListCtrl as vm'
          }
        }
    })
});
