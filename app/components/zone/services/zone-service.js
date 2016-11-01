module.exports = function(ngModule) {
  ngModule.service('ZoneService', function(HttpResource, $http) {
    return {
      list: function (data) {
        var postData = data || {};
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'zone?' + jQuery.param(postData)));
      },
      view: function (id){
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'zone/' + id));
      },
      update: function (id, zone) {
        return HttpResource.deferWrap($http.put(global.ENV.remoteHost + 'zone/' + id, zone));
      },
      remove: function (id) {
        return HttpResource.deferWrap($http.delete(global.ENV.remoteHost + 'zone/' + id));
      },
      create: function(zone) {
        return HttpResource.deferWrap($http.post(global.ENV.remoteHost + 'zone', zone));
      }
    };
  });
};
