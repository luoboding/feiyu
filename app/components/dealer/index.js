"use strict";
var ngModule = angular.module('app.dealer', ['app.common']);
require("./controllers/dealer-list-ctrl")(ngModule);
require("./controllers/dealer-create-ctrl")(ngModule);
require("./controllers/dealer-edit-ctrl")(ngModule);
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
        },
        resolve: {
          level: function(SettingDealerLevelService, Loader) {
            Loader.show();
            return SettingDealerLevelService.list({ispage: 0}).then(function(data) {
              Loader.hide();
              return data.status == 204 ? [] : data.response.data.data;
            });
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
        },
        resolve: {
          level: function(SettingDealerLevelService, Loader) {
            Loader.show();
            return SettingDealerLevelService.list({ispage: 0}).then(function(data) {
              Loader.hide();
              return data.status == 204 ? [] : data.response.data.data;
            });
          }
        }
    })
    .state('app.dealer.edit', {
        url: '/dealer/:id/edit',
        views: {
          '@': {
            template: require('./templates/dealer-edit.jade'),
            controller: 'DealerEditCtrl as vm'
          }
        },
        resolve: {
          dealer: function(Loader, $stateParams, DealerService){
            Loader.show();
            return DealerService.view($stateParams.id).then(function(data) {
              Loader.hide();
              return data.status == 204 ? {} : data.response.data.data;
            });
          },
          level: function(SettingDealerLevelService, Loader) {
            Loader.show();
            return SettingDealerLevelService.list({ispage: 0}).then(function(data) {
              Loader.hide();
              return data.status == 204 ? [] : data.response.data.data;
            });
          }
        }
    })
});
