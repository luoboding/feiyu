module.exports = function (ngModule) {
  ngModule.service('ManagerService', function($http, HttpResource) {
    return {
      list: function (post) {
        var postData = data || {};
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'establish?' + jQuery.param(postData)));
      },
      view: function (id){
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'establish/' + id));
      },
      update: function (id, manager) {
        return HttpResource.deferWrap($http.put(global.ENV.remoteHost + 'establish/' + id, manager));
      },
      remove: function (id) {
        return HttpResource.deferWrap($http.delete(global.ENV.remoteHost + 'establish/' + id));
      },
      create: function(manager) {
        return HttpResource.deferWrap($http.post(global.ENV.remoteHost + 'establish', manager));
      }
    };
  });
};
