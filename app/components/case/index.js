"use strict";
var ngModule = angular.module('app.case', ['app.common']);
require("./controllers/case-list-ctrl")(ngModule);
require("./controllers/case-create-ctrl")(ngModule);
require("./controllers/case-view-ctrl")(ngModule);
require("./controllers/popup/popup-case-view-ctrl")(ngModule);
require("./services/case-service")(ngModule);

ngModule.config(function ($stateProvider) {
    $stateProvider
    .state('app.case', {
        abstract: true
    })
    .state('app.case.list', {
        url: '/case',
        views: {
          '@': {
            template: require('./templates/case-list.jade'),
            controller: 'CaseListCtrl as vm'
          }
        }
    })
    .state('app.case.create', {
        url: '/case/create',
        views: {
          '@': {
            template: require('./templates/case-create.jade'),
            controller: 'CaseCreateCtrl as vm'
          }
        },
        resolve: {
          zone: function(ZoneService, Loader) {
            Loader.show();
            return ZoneService.list({ispage: 0}).then(function(data) {
              Loader.hide();
              return data.response.data.data;
            });
          },
          property: function(PropertyService, Loader) {
            Loader.show();
            return PropertyService.list({ispage: 0}).then(function(data) {
               return data.response.data.data;
            });
          }
        }
    })
    .state('app.case.view', {
      url: '/case/:id',
      views: {
        '@': {
            template: require('./templates/case-view.jade'),
            controller: 'CaseViewCtrl as vm'
          }
        },
        resolve: {
            showcase: function (CaseService, $stateParams, Loader) {
                Loader.show();
                return CaseService.view($stateParams.id).then(function (data) {
                    Loader.hide();
                    return data.response.data.data;
                });
            },
            property: function(PropertyService, Loader) {
              Loader.show();
              return PropertyService.list({ispage: 0}).then(function(data) {
                 return data.response.data.data;
              });
            }
        },
    });
});
