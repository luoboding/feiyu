"use strict";
var ngModule = angular.module('app.patrol', ['app.common']);
require("./controllers/patrol-list-ctrl")(ngModule);
require("./controllers/patrol-create-ctrl")(ngModule);
require("./controllers/patrol-edit-ctrl")(ngModule);
require("./controllers/popup/member-choose-popup-ctrl")(ngModule);
require("./controllers/popup/zone-choose-popup-ctrl")(ngModule);
require("./services/patrol-service")(ngModule);

ngModule.config(function ($stateProvider) {
    $stateProvider
    .state('app.patrol', {
        abstract: true
    })
    .state('app.patrol.list', {
        url: '/patrol',
        views: {
          '@': {
            template: require('./templates/patrol-list.jade'),
            controller: 'PatrolListCtrl as vm'
          }
        }
    })
    .state('app.patrol.create', {
        url: '/patrol/create',
        views: {
          '@': {
            template: require('./templates/patrol-create.jade'),
            controller: 'PatrolCreateCtrl as vm'
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
    .state('app.patrol.edit', {
      url: '/patrol/:id/edit',
      views: {
        '@': {
            template: require('./templates/patrol-edit.jade'),
            controller: 'PatrolEditCtrl as vm'
          }
        },
        resolve: {
            patrol: function (PatrolService, $stateParams, Loader) {
                Loader.show();
                return PatrolService.view($stateParams.id).then(function (data) {
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
            },
            responser: function(ResponserService, Loader) {
              Loader.show();
              return ResponserService.list({ispage: 0, page: 1, size: 10}).then(function(data) {
                Loader.hide();
                return data.response.data.data;
              });
            }
        },
    })
});
