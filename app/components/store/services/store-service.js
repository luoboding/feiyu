module.exports = function(ngModule) {
  ngModule.service('StoreService', function ($http, HttpResource) {
    return {
      list: function (data) {
        var postData = data || {};
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'store?' + jQuery.param(postData)));
      },
      view: function (id){
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'store/' + id));
      },
      update: function (id, patrol) {
        return HttpResource.deferWrap($http.put(global.ENV.remoteHost + 'store/' + id, patrol));
      },
      remove: function (id) {
        return HttpResource.deferWrap($http.delete(global.ENV.remoteHost + 'store/' + id));
      },
      create: function(patrol) {
        return HttpResource.deferWrap($http.post(global.ENV.remoteHost + 'store', patrol));
      }
    };
  });
};
