module.exports = function(ngModule) {
  ngModule.service('RenovationService', function ($http, HttpResource) {
    return {
      list: function (data) {
        var postData = data || {};
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'renovation?' + jQuery.param(postData)));
      },
      view: function(id) {
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'renovation/' + id));
      }
    };
  });
};
