module.exports = function(ngModule) {
  ngModule.service('AreaService', function(HttpResource, $http) {
    return {
      list: function (data) {
        var postData = data || {};
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'area?' + jQuery.param(postData)));
      },
      view: function (id){
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'area/' + id));
      },
      update: function (id, area) {
        return HttpResource.deferWrap($http.put(global.ENV.remoteHost + 'area/' + id, area));
      },
      remove: function (id) {
        return HttpResource.deferWrap($http.delete(global.ENV.remoteHost + 'area/' + id));
      },
      create: function(area) {
        return HttpResource.deferWrap($http.post(global.ENV.remoteHost + 'area', area));
      }
    };
  });
};
