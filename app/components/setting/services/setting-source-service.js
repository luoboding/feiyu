"use strict";
module.exports = function(ngModule) {
  ngModule.service('SettingSourceService', function($http, HttpResource) {
    return {
      getSourceList: function (data) {
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'source?' + jQuery.param(data)));
      },
      viewSource: function (id){
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'source/' + id));
      },
      updateSource: function (id, source) {
        return HttpResource.deferWrap($http.put(global.ENV.remoteHost + 'source/' + id, source));
      },
      removeSource: function (id) {
        return HttpResource.deferWrap($http.delete(global.ENV.remoteHost + 'source/' + id));
      },
      createSource: function(source) {
        return HttpResource.deferWrap($http.post(global.ENV.remoteHost + 'source', source));
      }
    };
  });
};
