"use strict";
var ngModule = angular.module('app.property', ['app.common']);
require("./controllers/property-list-ctrl")(ngModule);
require("./controllers/property-create-ctrl")(ngModule);
require("./controllers/property-edit-ctrl")(ngModule);
require("./services/property-service")(ngModule);
require("./filters/property-type-filter")(ngModule);
// require("./filters/dealer-status-filter")(ngModule);
ngModule.config(function ($stateProvider) {
    $stateProvider
    .state('app.property', {
        abstract: true
    })
    .state('app.property.list', {
        url: '/property',
        views: {
          '@': {
            template: require('./templates/property-list.jade'),
            controller: 'PropertyListCtrl as vm'
          }
        }
    })
    .state('app.property.create', {
        url: '/property/create',
        views: {
          '@': {
            template: require('./templates/property-create.jade'),
            controller: 'PropertyCreateCtrl as vm'
          }
        },
        resolve: {
          parents: function(PropertyService, Loader) {
            Loader.show();
            return PropertyService.list().then(function(data) {
              Loader.hide();
              return data.response.data.data;
            });
          }
        }
    })
    .state('app.property.edit', {
      url: '/property/:id/edit',
      views: {
        '@': {
            template: require('./templates/property-edit.jade'),
            controller: 'PropertyEditCtrl as vm'
          }
        },
        resolve: {
            property: function (PropertyService, $stateParams, Loader) {
                Loader.show();
                return PropertyService.view($stateParams.id).then(function (data) {
                    Loader.hide();
                    return data.response.data;
                });
            },
            parents: function(PropertyService, Loader) {
              Loader.show();
              return PropertyService.list().then(function(data) {
                Loader.hide();
                return data.response.data.data;
              });
            }
        },
    });
});
