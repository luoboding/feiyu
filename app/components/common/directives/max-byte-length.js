'use strict';

module.exports = function (ngModule) {

    ngModule.directive('maxByteLength', function ($filter, $timeout) {
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function (scope, elm, attrs, ctrl) {

        function cutOffString(text) {
          var len = text.length + (text.match(/[^\x00-\xff]/g) || "").length;
          if (len > attrs.maxByteLength) {
            text = text.substring(0, text.length - 1);
            ctrl.$render();
            return cutOffString(text);
          } else {
            return text;
          }
        }

        function validate(text) {
          text = cutOffString(text);
          ctrl.$setViewValue(text);
          //ctrl.$render();
          $timeout(function(){
            scope.ngModel = text;
          });
        }

        //elm.attr('placeholder', '最多' + attrs.maxByteLength + '个字符或' + attrs.maxByteLength / 2 + '个汉字');

        var validateTimeoutId;

        scope.$watch(attrs.ngModel, function (newValue, oldValue) {
          if (elm.val()){
            if (validateTimeoutId) {
              window.clearTimeout(validateTimeoutId);
            }
            validateTimeoutId = setTimeout(function () {
              validate(elm.val());
            }, 0);
          }
        });

      }
    };
  });
  };
