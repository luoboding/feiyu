"use strict";
module.exports = function(ngModule) {
  ngModule.service('SettingDealerLevelService', function($http, HttpResource) {
    return {
      list: function (data) {
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'dealerlevel?' + jQuery.param(data)));
      },
      view: function (id){
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'dealerlevel/' + id));
      },
      update: function (id, source) {
        return HttpResource.deferWrap($http.put(global.ENV.remoteHost + 'dealerlevel/' + id, source));
      },
      remove: function (id) {
        return HttpResource.deferWrap($http.delete(global.ENV.remoteHost + 'dealerlevel/' + id));
      },
      create: function(source) {
        return HttpResource.deferWrap($http.post(global.ENV.remoteHost + 'dealerlevel', source));
      }
    };
  });
};
