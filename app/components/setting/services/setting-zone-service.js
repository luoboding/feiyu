"use strict";
module.exports = function(ngModule) {
  ngModule.service('SettingZoneService', function($http, HttpResource) {
    return {
      getZoneList: function (data) {
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'zone?' + jQuery.param(data)));
      },
      viewZone: function (id){
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'zone/' + id));
      },
      updateZone: function (id, zone) {
        return HttpResource.deferWrap($http.put(global.ENV.remoteHost + 'zone/' + id, zone));
      },
      removeZone: function (id) {
        return HttpResource.deferWrap($http.delete(global.ENV.remoteHost + 'zone/' + id));
      },
      createZone: function(zone) {
        return HttpResource.deferWrap($http.post(global.ENV.remoteHost + 'zone', zone));
      }
    };
  });
};
