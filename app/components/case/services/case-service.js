module.exports = function(ngModule) {
  ngModule.service('CaseService', function(HttpResource, $http) {
    return {
      list: function (data) {
        var data = data || {};
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'case?' + jQuery.param(data)));
      },
      view: function (id){
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'case/' + id));
      },
      update: function (id, case) {
        return HttpResource.deferWrap($http.put(global.ENV.remoteHost + 'case/' + id, case));
      },
      remove: function (id) {
        return HttpResource.deferWrap($http.delete(global.ENV.remoteHost + 'case/' + id));
      },
      create: function(case) {
        return HttpResource.deferWrap($http.post(global.ENV.remoteHost + 'case', case));
      }
    };
  });
};
