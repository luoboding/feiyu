"use strict";
var ngModule = angular.module('app.report', ['app.common']);
require("./controllers/report-list-ctrl")(ngModule);
require("./controllers/report-create-ctrl")(ngModule);
require("./controllers/report-edit-ctrl")(ngModule);
require("./services/report-service")(ngModule);
require("./filters/report-type-filter")(ngModule);
require("./filters/report-belong-type-filter")(ngModule);
// require("./filters/dealer-status-filter")(ngModule);
ngModule.config(function ($stateProvider) {
    $stateProvider
    .state('app.report', {
        abstract: true
    })
    .state('app.report.list', {
        url: '/report',
        views: {
          '@': {
            template: require('./templates/report-list.jade'),
            controller: 'ReportListCtrl as vm'
          }
        },
        resolve: {
          manager: function(Loader, ManagerService) {
            Loader.show();
            return ManagerService.list({ispage: 0}).then(function (data) {
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
          store: function(StoreService, Loader) {
            Loader.show();
            return StoreService.list({page: 1, size: 10}).then(function(data) {
              return data.response.data.data;
            });
          }
        }
    })
    .state('app.report.create', {
        url: '/report/create',
        views: {
          '@': {
            template: require('./templates/report-create.jade'),
            controller: 'ReportCreateCtrl as vm'
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
          dealer: function(DealerService, Loader) {
            return DealerService.list({page: 1, size: 10}).then(function(data){
              return data.response.data.data;
            });
          },
          belong: function(ReportService, Loader) {
            return ReportService.belongList().then(function(data) {
              return data.response.data.data;
            });
          }
        }
    })
    .state('app.report.edit', {
      url: '/report/:id/edit',
      views: {
        '@': {
            template: require('./templates/report-edit.jade'),
            controller: 'ReportEditCtrl as vm'
          }
        },
        resolve: {
            report: function (reportService, $stateParams, Loader) {
                Loader.show();
                return ReportService.view($stateParams.id).then(function (data) {
                    Loader.hide();
                    return data.response.data;
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
