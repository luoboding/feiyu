'use strict';
module.exports = function (ngModule) {
    ngModule.service('Loader', function() {
        return {
            show: function(text) {
                var templateData =  require("../templates/loader.jade");
                var template = templateData.call();
                template = template.replace('%@', text ? text : '数据加载中');
                jQuery('.g-md-loading').remove();
                jQuery('body').append(template);
            },

            hide: function(callback) {
                jQuery('.g-md-loading').remove();
                if (callback) {
                    callback.call();
                }
            }
        };
    });
};
