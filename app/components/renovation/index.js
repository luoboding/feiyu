"use strict";
var ngModule = angular.module('app.renovation', ['app.common']);
require("./controllers/renovation-list-ctrl")(ngModule);
require("./services/renovation-service")(ngModule);

ngModule.config(function ($stateProvider) {
    $stateProvider
    .state('app.renovation', {
        abstract: true
    })
    .state('app.renovation.list', {
        url: '/renovation',
        views: {
          '@': {
            template: require('./templates/renovation-list.jade'),
            controller: 'RenovationListCtrl as vm'
          }
        },
        resolve: {
          manager: function(Loader, ManagerService) {
            Loader.show();
            return ManagerService.list({ispage: 0}).then(function (data) {
              Loader.hide();
              return data.response.data.data;
            });
          }
        }
    })
});
