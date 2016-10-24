module.exports = function(ngModule) {
  ngModule.service('RenovationService', function ($http, HttpResource) {
    return {
      list: function (data) {
        var data = data || {};
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'renovation?' + jQuery.param(data)));
      }
    };
  });
};
