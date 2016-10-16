module.exports = function(ngModule) {
  ngModule.service('ResponserService', function(HttpResource, $http) {
    return {
      list: function (data) {
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'responsible?' + jQuery.param(data)));
      },
      view: function (id){
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'responsible/' + id));
      },
      update: function (id, area) {
        return HttpResource.deferWrap($http.put(global.ENV.remoteHost + 'responsible/' + id, area));
      },
      remove: function (id) {
        return HttpResource.deferWrap($http.delete(global.ENV.remoteHost + 'responsible/' + id));
      },
      create: function(area) {
        return HttpResource.deferWrap($http.post(global.ENV.remoteHost + 'responsible', area));
      }
    };
  });
};
