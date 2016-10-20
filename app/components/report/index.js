"use strict";
var ngModule = angular.module('app.report', ['app.common']);
require("./controllers/report-list-ctrl")(ngModule);
require("./controllers/report-create-ctrl")(ngModule);
require("./controllers/report-edit-ctrl")(ngModule);
require("./services/report-service")(ngModule);
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
            parent: function (ReportService, $stateParams, Loader) {
                Loader.show();
                return ReportService.list({ispage: 0}).then(function (data) {
                    Loader.hide();
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
            controller: 'reportCreateCtrl as vm'
          }
        },
        resolve: {
            parent: function (ReportService, $stateParams, Loader) {
                Loader.show();
                return ReportService.list({ispage: 0}).then(function (data) {
                    Loader.hide();
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
            controller: 'reportEditCtrl as vm'
          }
        },
        resolve: {
            report: function (ReportService, $stateParams, Loader) {
                Loader.show();
                return ReportService.view($stateParams.id).then(function (data) {
                    Loader.hide();
                    return data.response.data;
                });
            },
            parent: function (ReportService, $stateParams, Loader) {
                Loader.show();
                return ReportService.list({ispage: 0}).then(function (data) {
                    Loader.hide();
                    return data.response.data.data;
                });
            }
        }
    })
});
