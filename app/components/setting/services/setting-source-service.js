"use strict";
module.exports = function(ngModule) {
  ngModule.service('SettingSourceService', function($http, HttpResource) {
    return {
      list: function (data) {
        var postData = data || {};
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'source?' + jQuery.param(postData)));
      },
      view: function (id){
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'source/' + id));
      },
      update: function (id, source) {
        return HttpResource.deferWrap($http.put(global.ENV.remoteHost + 'source/' + id, source));
      },
      remove: function (id) {
        return HttpResource.deferWrap($http.delete(global.ENV.remoteHost + 'source/' + id));
      },
      create: function(source) {
        return HttpResource.deferWrap($http.post(global.ENV.remoteHost + 'source', source));
      }
    };
  });
};
