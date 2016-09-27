"use strict";

module.exports = function (ngModule) {
    ngModule.directive('numeric', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                modelCtrl.$parsers.push(function (inputValue) {

                    if (!inputValue) {
                        return 0;
                    }

                    var firstParse = inputValue.replace(/[^0-9]/g, '');//replace(/[^0-9 . -]/g, '')

                    var safeParse = firstParse.charAt(0);
                    var prepParse = firstParse.substring(1, firstParse.length);

                    var secondParse = safeParse + prepParse.replace(/[^0-9]/g, '');

                    var n = secondParse.indexOf(".");
                    var transformedInput;

                    if (n == -1) {
                        transformedInput = secondParse;
                    } else {
                        safeParse = secondParse.substring(0, n + 1);
                        firstParse = (secondParse.substring(n + 1, secondParse.length)).replace(/[^0-9]/g, '');
                        n = parseInt(attrs.precision) || 2;

                        if (firstParse.length <= n) {
                            transformedInput = safeParse + firstParse;
                        } else {
                            transformedInput = safeParse + firstParse.substring(0, n);
                        }
                    }

                    var min = parseInt(attrs.min);
                    var max = parseInt(attrs.max);

                    if (transformedInput != inputValue ||
                        transformedInput < min ||
                        transformedInput > max) {
                        var returnValue;
                        if (transformedInput < min || transformedInput > max) {
                            returnValue = transformedInput.substring(0, transformedInput.length - 1);
                        } else {
                            returnValue = transformedInput;
                        }

                        modelCtrl.$setViewValue(returnValue);
                        modelCtrl.$render();
                        return returnValue;
                    }

                    return transformedInput;
                });
            }
        };
    });

};
