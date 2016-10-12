"use strict";
module.exports = function(ngModule) {
  ngModule.service('DealerService', function($http, HttpResource) {
    return {
      getList: function(data) {
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'dealer'));
      }
    };
  });
};
