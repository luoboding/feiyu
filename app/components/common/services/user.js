'use strict';

module.exports = function(ngModule) {
  ngModule.service('User', function($http, HttpResource) {
    return {
      login: function(username, password) {
          var data = {
              loginMail: username,
              password: password
          };
          return HttpResource.deferWrap($http.post(global.ENV.remoteHost + 'authenticate', data));
      },
      logout: function() {
      }
    };
  });
};
