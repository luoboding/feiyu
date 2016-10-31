module.exports = function(ngModule) {
  ngModule.service('PropertyService', function(HttpResource, $http) {
    return {
      list: function (data) {
        var postData = data || {};
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'caseclass?' + jQuery.param(postData)));
      },
      view: function (id){
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'caseclass/' + id));
      },
      update: function (id, property) {
        return HttpResource.deferWrap($http.put(global.ENV.remoteHost + 'caseclass/' + id, property));
      },
      remove: function (id) {
        return HttpResource.deferWrap($http.delete(global.ENV.remoteHost + 'caseclass/' + id));
      },
      create: function(property) {
        return HttpResource.deferWrap($http.post(global.ENV.remoteHost + 'caseclass', property));
      }
    };
  });
};
