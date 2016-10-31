module.exports = function(ngModule) {
  ngModule.service('MarketingService', function(HttpResource, $http) {
    return {
      list: function (data) {
        var postData = data || {};
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'marketProgram?' + jQuery.param(postData)));
      },
      view: function (id){
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'marketProgram/' + id));
      },
      update: function (id, marketing) {
        return HttpResource.deferWrap($http.put(global.ENV.remoteHost + 'marketProgram/' + id, marketing));
      },
      remove: function (id) {
        return HttpResource.deferWrap($http.delete(global.ENV.remoteHost + 'marketProgram/' + id));
      },
      create: function(marketing) {
        return HttpResource.deferWrap($http.post(global.ENV.remoteHost + 'marketProgram', marketing));
      }
    };
  });
};
