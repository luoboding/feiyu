'use strict';
module.exports = function (ngModule) {
    ngModule.filter("parameterFilter", function () {

        var paramMapping = function (param, keyName, valueName) {
            if (param[valueName]) {
                param[param[keyName]] = param[valueName];
                delete param[valueName];
            }
            delete param[keyName];
        };

        var paramFilter = {
            getQueryParams: function (searchParams, pager) {
                var queryParams = {};
                if (searchParams) {
                    var datetimeParams = ['start_time', 'end_time'];
                    angular.forEach(searchParams, function (value, prop) {
                        if (value && value !== '') {
                            if (datetimeParams.indexOf(prop) != -1) {
                                queryParams[prop] = value.getTime();
                            } else {
                                queryParams[prop] = value;
                            }
                        }
                    });

                    if (!queryParams.start_time || !queryParams.end_time) {
                        delete queryParams.time_type;
                    } else {
                        var dtStart = new Date(queryParams.start_time);
                        dtStart.setHours(0);
                        dtStart.setMinutes(0);
                        dtStart.setSeconds(0);
                        queryParams.start_time = dtStart.getTime();

                        var dtEnd = new Date(queryParams.end_time);
                        dtEnd.setHours(23);
                        dtEnd.setMinutes(59);
                        dtEnd.setSeconds(59);
                        queryParams.end_time = dtEnd.getTime();
                    }
                    if(!queryParams.filter) delete queryParams.filter_name;
                    paramMapping(queryParams, 'text_filter', 'text_filter_value');
                    paramMapping(queryParams, 'ex_text_filter', 'ex_text_filter_value');

                }
                if (pager) {
                    queryParams.page = pager.page - 1;
                    queryParams.size = pager.size;
                }
                return queryParams;
            }
        };

        return paramFilter;
    });
};
