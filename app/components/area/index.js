"use strict";
var ngModule = angular.module('app.area', ['app.common']);
require("./controllers/area-list-ctrl")(ngModule);
require("./controllers/area-create-ctrl")(ngModule);
require("./controllers/area-edit-ctrl")(ngModule);
require("./services/area-service")(ngModule);
// require("./filters/dealer-status-filter")(ngModule);
ngModule.config(function ($stateProvider) {
    $stateProvider
    .state('app.area', {
        abstract: true
    })
    .state('app.area.list', {
        url: '/area',
        views: {
          '@': {
            template: require('./templates/area-list.jade'),
            controller: 'AreaListCtrl as vm'
          }
        },
        resolve: {
            parent: function (AreaService, Loader) {
                Loader.show();
                return AreaService.list({ispage: 0}).then(function (data) {
                    Loader.hide();
                    console.log(data)
                    if (data.status == 204) {
                      return [];
                    } else {
                      return data.response.data.data
                    }
                });
            },
            zone: function(ZoneService, Loader) {
              Loader.show();
              return ZoneService.list({ispage: 0}).then(function(data) {
                return data.response.data.data;
              });
            }
        }
    })
    .state('app.area.create', {
        url: '/area/create',
        views: {
          '@': {
            template: require('./templates/area-create.jade'),
            controller: 'AreaCreateCtrl as vm'
          }
        },
        resolve: {
            parent: function (AreaService, Loader) {
                Loader.show();
                return AreaService.list({ispage: 0}).then(function (data) {
                    Loader.hide();
                    return data.status == 204 ? [] : data.response.data.data;
                });
            },
            zone: function(ZoneService, Loader) {
              Loader.show();
              return ZoneService.list({ispage: 0}).then(function(data) {
                Loader.hide();
                return data.status == 204 ? [] : data.response.data.data;
              });
            }
        }
    })
    .state('app.area.edit', {
      url: '/area/:id/edit',
      views: {
        '@': {
            template: require('./templates/area-edit.jade'),
            controller: 'AreaEditCtrl as vm'
          }
        },
        resolve: {
            area: function (AreaService, $stateParams, Loader) {
                Loader.show();
                return AreaService.view($stateParams.id).then(function (data) {
                    Loader.hide();
                    return data.status == 204 ? data.response.data : {};
                });
            },
            parent: function (AreaService, Loader) {
                Loader.show();
                return AreaService.list({ispage: 0}).then(function (data) {
                    Loader.hide();
                    return data.status == 204 ? [] : data.response.data.data;
                });
            },
            zone: function(ZoneService, Loader) {
              Loader.show();
              return ZoneService.list({ispage: 0}).then(function(data) {
                Loader.hide();
                return data.status == 204 ? [] : data.response.data.data;
              });
            }
        }
    })
});
