"use strict";
var ngModule = angular.module('app.zone', ['app.common']);
require("./controllers/zone-list-ctrl")(ngModule);
require("./controllers/zone-create-ctrl")(ngModule);
require("./controllers/zone-edit-ctrl")(ngModule);
require("./services/zone-service")(ngModule);
// require("./filters/dealer-status-filter")(ngModule);
ngModule.config(function ($stateProvider) {
    $stateProvider
    .state('app.zone', {
        abstract: true
    })
    .state('app.zone.list', {
        url: '/zone',
        views: {
          '@': {
            template: require('./templates/zone-list.jade'),
            controller: 'ZoneListCtrl as vm'
          }
        },
        resolve: {
            parent: function (ZoneService, $stateParams, Loader) {
                Loader.show();
                return ZoneService.list({ispage: 0}).then(function (data) {
                    Loader.hide();
                    return data.response.data.data;
                });
            }
        }
    })
    .state('app.zone.create', {
        url: '/zone/create',
        views: {
          '@': {
            template: require('./templates/zone-create.jade'),
            controller: 'ZoneCreateCtrl as vm'
          }
        },
        resolve: {
            parent: function (ZoneService, $stateParams, Loader) {
                Loader.show();
                return ZoneService.list({ispage: 0}).then(function (data) {
                    Loader.hide();
                    return data.response.data.data;
                });
            }
        }
    })
    .state('app.zone.edit', {
      url: '/zone/:id/edit',
      views: {
        '@': {
            template: require('./templates/zone-edit.jade'),
            controller: 'ZoneEditCtrl as vm'
          }
        },
        resolve: {
            zone: function (ZoneService, $stateParams, Loader) {
                Loader.show();
                return ZoneService.view($stateParams.id).then(function (data) {
                    Loader.hide();
                    return data.response.data;
                });
            },
            parent: function (ZoneService, $stateParams, Loader) {
                Loader.show();
                return ZoneService.list({ispage: 0}).then(function (data) {
                    Loader.hide();
                    return data.response.data.data;
                });
            }
        }
    })
});
