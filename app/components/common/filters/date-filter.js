'use strict';
module.exports = function (ngModule) {
    ngModule.filter("dateFilter", function ($filter) {
        return function(secondTime, formatter) {
            if (!formatter) {
                formatter = 'yyyy-MM-dd';
            }
            return $filter('date')(secondTime*1000,  formatter);
        };
    });
};
