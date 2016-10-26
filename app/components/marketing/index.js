"use strict";
var ngModule = angular.module('app.marketing', ['app.common']);
require("./controllers/marketing-list-ctrl")(ngModule);
require("./controllers/marketing-create-ctrl")(ngModule);
require("./controllers/marketing-edit-ctrl")(ngModule);
require("./services/marketing-service")(ngModule);
require("./filters/marketing-type-filter")(ngModule);
require("./filters/marketing-force-type-filter")(ngModule);
require("./filters/marketing-publish-type-filter")(ngModule);
require("./filters/marketing-status-filter")(ngModule);

ngModule.config(function ($stateProvider) {
    $stateProvider
    .state('app.marketing', {
        abstract: true
    })
    .state('app.marketing.list', {
        url: '/marketing',
        views: {
          '@': {
            template: require('./templates/marketing-list.jade'),
            controller: 'MarketingListCtrl as vm'
          }
        }
    })
    .state('app.marketing.create', {
        url: '/marketing/create',
        views: {
          '@': {
            template: require('./templates/marketing-create.jade'),
            controller: 'MarketingCreateCtrl as vm'
          }
        },
        resolve: {
          zone: function(ZoneService, Loader) {
            Loader.show();
            return ZoneService.list({ispage: 0}).then(function(data) {
              Loader.hide();
              return data.response.data.data;
            });
          }
        }
    })
    .state('app.marketing.edit', {
      url: '/marketing/:id/edit',
      views: {
        '@': {
            template: require('./templates/marketing-edit.jade'),
            controller: 'MarketingEditCtrl as vm'
          }
        },
        resolve: {
            marketing: function (MarketingService, $stateParams, Loader) {
                Loader.show();
                return MarketingService.view($stateParams.id).then(function (data) {
                    Loader.hide();
                    return data.response.data.data;
                });
            },
            zone: function(ZoneService, Loader) {
              Loader.show();
              return ZoneService.list({ispage: 0}).then(function(data) {
                Loader.hide();
                return data.response.data.data;
              });
            }
        },
    })
});
