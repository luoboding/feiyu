module.exports = function(ngModule) {
  ngModule.service('PatrolService', function(HttpResource, $http) {
    return {
      list: function (data) {
        var postData = data || {};
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'marketplan?' + jQuery.param(postData)));
      },
      view: function (id){
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'marketplan/' + id));
      },
      update: function (id, patrol) {
        return HttpResource.deferWrap($http.put(global.ENV.remoteHost + 'marketplan/' + id, patrol));
      },
      remove: function (id) {
        return HttpResource.deferWrap($http.delete(global.ENV.remoteHost + 'marketplan/' + id));
      },
      create: function(patrol) {
        return HttpResource.deferWrap($http.post(global.ENV.remoteHost + 'marketplan', patrol));
      }
    };
  });
};
