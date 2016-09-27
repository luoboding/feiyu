'use strict';
var ngModule = angular.module('app.nav', ['app.common']);
require('./controllers/top-nav-ctrl')(ngModule);
require('./controllers/left-nav-ctrl')(ngModule);
require('./services/nav')(ngModule);

ngModule.config(function ($stateProvider) {
    var views = {
        top_nav: {
            controller: 'TopNavCtrl as vm',
            template: require('./templates/top_nav.jade')
        },
        left_nav: {
            controller: 'LeftNavCtrl as vm',
            template: require('./templates/left_nav.jade')
        }
    };
    $stateProvider.state('app', {
        abstract: true,
        views: views
    });
});
