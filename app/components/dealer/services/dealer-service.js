"use strict";
module.exports = function(ngModule) {
  ngModule.service('DealerService', function($http, HttpResource) {
    return {
      list: function(data) {
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'dealer?' + jQuery.param(data)));
      },
      create: function(dealer) {
        return HttpResource.deferWrap($http.post(global.ENV.remoteHost + 'dealer', dealer));
      },
      view: function(id) {
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'dealer/' + id));
      },
      update: function(id, dealer) {
        return HttpResource.deferWrap($http.put(global.ENV.remoteHost + 'dealer/' + id, dealer));
      }
    };
  });
};
