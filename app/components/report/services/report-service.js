module.exports = function(ngModule) {
  ngModule.service('ReportService', function(HttpResource, $http) {
    return {
      list: function (data) {
        var data = data || {};
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'report?' + jQuery.param(data)));
      },
      view: function (id){
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'report/' + id));
      },
      update: function (id, report) {
        return HttpResource.deferWrap($http.put(global.ENV.remoteHost + 'report/' + id, report));
      },
      remove: function (id) {
        return HttpResource.deferWrap($http.delete(global.ENV.remoteHost + 'report/' + id));
      },
      create: function(report) {
        return HttpResource.deferWrap($http.post(global.ENV.remoteHost + 'report', report));
      },
      belongList: function() {
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'belong'));
      }
    };
  });
};
