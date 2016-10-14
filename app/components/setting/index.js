"use strict";
var ngModule = angular.module('app.setting', ['app.common']);
//source
require("./controllers/setting-source-list-ctrl")(ngModule);
require("./controllers/setting-source-edit-ctrl")(ngModule);
require("./controllers/setting-source-create-ctrl")(ngModule);
//dealer level
require("./controllers/setting-dealer-level-list-ctrl")(ngModule);
require("./controllers/setting-dealer-level-edit-ctrl")(ngModule);
require("./controllers/setting-dealer-level-create-ctrl")(ngModule);

require("./services/setting-source-service")(ngModule);
require("./services/setting-dealer-level-service")(ngModule);
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
    .state('app.setting.source.create', {
        url: '/setting/source/create',
        views: {
          '@': {
            template: require('./templates/source-create.jade'),
            controller: 'SettingSourceCreateCtrl as vm'
          }
        }
    })
    .state('app.setting.source.edit', {
        url: '/setting/source/:id/edit',
        views: {
          '@': {
            template: require('./templates/source-edit.jade'),
            controller: 'SettingSourceEditCtrl as vm'
          }
        },
        resolve: {
            source: function (SettingSourceService, $stateParams, Loader) {
                Loader.show();
                return SettingSourceService.view($stateParams.id).then(function (data) {
                    Loader.hide();
                    return data.response.data;
                });
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
    .state('app.setting.dealer-level.create', {
    	url: '/setting/dealer-level/create',
        views: {
          '@': {
            template: require('./templates/dealer-level-create.jade'),
            controller: 'SettingDealerLevelCreateCtrl as vm'
          }
        }
    })
    .state('app.setting.dealer-level.edit', {
      url: '/setting/dealer-level/:id/edit',
      views: {
        '@': {
            template: require('./templates/dealer-level-edit.jade'),
            controller: 'SettingDealerLevelEditCtrl as vm'
          }
        },
        resolve: {
            level: function (SettingDealerLevelService, $stateParams, Loader) {
                Loader.show();
                return SettingDealerLevelService.view($stateParams.id).then(function (data) {
                    Loader.hide();
                    return data.response.data;
                });
            }
        }
    })
});
