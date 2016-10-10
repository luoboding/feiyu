"use strict";
var ngModule = angular.module('app.setting', ['app.common']);
require("./controllers/setting-source-list-ctrl")(ngModule);
require("./controllers/setting-dealer-level-list-ctrl")(ngModule);
ngModule.config(function ($stateProvider) {
    $stateProvider
    .state('app.setting', {
        abstract: true
    })
    .state('app.setting.source', {
        abstract: true
    })
    .state('app.setting.source.list', {
        url: '/setting/source',
        views: {
          '@': {
            template: require('./templates/source-list.jade'),
            controller: 'SettingSourceListCtrl as vm'
          }
        }
    })
    .state('app.setting.dealer-level', {
        abstract: true
    })
    .state('app.setting.dealer-level.list', {
    	url: '/setting/dealer-level',
        views: {
          '@': {
            template: require('./templates/dealer-level-list.jade'),
            controller: 'SettingDealerLevelListCtrl as vm'
          }
        }
    })
});
