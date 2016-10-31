module.exports = function(ngModule) {
  ngModule.service('NoticeService', function(HttpResource, $http) {
    return {
      list: function (data) {
        var postData = data || {};
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'notice?' + jQuery.param(postData)));
      },
      view: function (id){
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'notice/' + id));
      },
      update: function (id, notice) {
        return HttpResource.deferWrap($http.put(global.ENV.remoteHost + 'notice/' + id, notice));
      },
      remove: function (id) {
        return HttpResource.deferWrap($http.delete(global.ENV.remoteHost + 'notice/' + id));
      },
      create: function(notice) {
        return HttpResource.deferWrap($http.post(global.ENV.remoteHost + 'notice', notice));
      }
    };
  });
};
