"use strict";
var ngModule = angular.module('app.customer', ['app.common']);
require("./controllers/customer-list-ctrl")(ngModule);
require("./controllers/customer-create-ctrl")(ngModule);
require("./controllers/customer-edit-ctrl")(ngModule);
require("./services/customer-service")(ngModule);
require("./filters/customer-sex-filter")(ngModule);
// require("./filters/dealer-status-filter")(ngModule);
ngModule.config(function ($stateProvider) {
    $stateProvider
    .state('app.customer', {
        abstract: true
    })
    .state('app.customer.list', {
        url: '/customer',
        views: {
          '@': {
            template: require('./templates/customer-list.jade'),
            controller: 'CustomerListCtrl as vm'
          }
        },
        resolve: {
          source: function(SettingSourceService, Loader) {
            Loader.show();
            return SettingSourceService.list({ispage: 0}).then(function(data) {
              Loader.hide();
              return data.response.data.data;
            });
          }
        }
    })
    .state('app.customer.create', {
        url: '/customer/create',
        views: {
          '@': {
            template: require('./templates/customer-create.jade'),
            controller: 'CustomerCreateCtrl as vm'
          }
        }
    })
    .state('app.customer.edit', {
      url: '/customer/:id/edit',
      views: {
        '@': {
            template: require('./templates/customer-edit.jade'),
            controller: 'CustomerEditCtrl as vm'
          }
        },
        resolve: {
            customer: function (CustomerService, $stateParams, Loader) {
                Loader.show();
                return CustomerService.view($stateParams.id).then(function (data) {
                    Loader.hide();
                    return data.response.data;
                });
            }
        },
    });
});
