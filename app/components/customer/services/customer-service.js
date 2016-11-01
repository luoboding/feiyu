module.exports = function(ngModule) {
  ngModule.service('CustomerService', function(HttpResource, $http) {
    return {
      list: function (data) {
        var postData = data || {};
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'customer?' + jQuery.param(postData)));
      },
      view: function (id){
        return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'customer/' + id));
      },
      update: function (id, customer) {
        return HttpResource.deferWrap($http.put(global.ENV.remoteHost + 'customer/' + id, customer));
      },
      remove: function (id) {
        return HttpResource.deferWrap($http.delete(global.ENV.remoteHost + 'customer/' + id));
      },
      create: function(customer) {
        return HttpResource.deferWrap($http.post(global.ENV.remoteHost + 'customer', customer));
      }
    };
  });
};
