"use strict";
var ngModule = angular.module('app.notice', ['app.common']);
require("./controllers/notice-list-ctrl")(ngModule);
require("./controllers/notice-create-ctrl")(ngModule);
require("./controllers/notice-edit-ctrl")(ngModule);
require("./services/notice-service")(ngModule);
require("./filters/notice-type-filter")(ngModule);
// require("./filters/dealer-status-filter")(ngModule);
ngModule.config(function ($stateProvider) {
    $stateProvider
    .state('app.notice', {
        abstract: true
    })
    .state('app.notice.list', {
        url: '/notice',
        views: {
          '@': {
            template: require('./templates/notice-list.jade'),
            controller: 'NoticeListCtrl as vm'
          }
        },
        resolve: {
          zone: function(ZoneService, Loader) {
            Loader.show();
            return ZoneService.list({ispage: 0}).then(function(data) {
              Loader.hide();
              return data.status == 204 ? [] : data.response.data.data;
            });
          }
        }
    })
    .state('app.notice.create', {
        url: '/notice/create',
        views: {
          '@': {
            template: require('./templates/notice-create.jade'),
            controller: 'NoticeCreateCtrl as vm'
          }
        },
        resolve: {
          zone: function(ZoneService, Loader) {
            Loader.show();
            return ZoneService.list({ispage: 0}).then(function(data) {
              Loader.hide();
              return data.status == 204 ? [] : data.response.data.data;
            });
          }
        }
    })
    .state('app.notice.edit', {
      url: '/notice/:id/edit',
      views: {
        '@': {
            template: require('./templates/notice-edit.jade'),
            controller: 'NoticeEditCtrl as vm'
          }
        },
        resolve: {
            notice: function (NoticeService, $stateParams, Loader) {
                Loader.show();
                return NoticeService.view($stateParams.id).then(function (data) {
                    Loader.hide();
                    return data.response.data;
                });
            },
            zone: function(ZoneService, Loader) {
              Loader.show();
              return ZoneService.list({ispage: 0}).then(function(data) {
                Loader.hide();
                return data.status == 204 ? [] : data.response.data.data;
              });
            }
        },
    })
});
