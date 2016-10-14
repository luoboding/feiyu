"use strict";
var ngModule = angular.module('app.setting', ['app.common']);
require("./controllers/setting-source-list-ctrl")(ngModule);
require("./controllers/setting-dealer-level-list-ctrl")(ngModule);
require("./controllers/setting-dealer-level-edit-ctrl")(ngModule);
require("./services/setting-source-service")(ngModule);
require("./services/setting-zone-service")(ngModule);
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
