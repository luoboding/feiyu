"use strict";
module.exports = function (ngModule) {
    ngModule.provider("ngQuickDateDefaults", function () {
        return {
            options: {
                dateFormat: 'yyyy-MM-dd',
                timeFormat: 'HH:mm',
                labelFormat: null,
                placeholder: 'Click to Set Date',
                hoverText: null,
                closeButtonHtml: "<i class='fa fa-times'></i>",
                buttonIconHtml: "<i class='fa fa-calendar'></i>",
                nextLinkHtml: "<i class='fa fa-chevron-right'></i>",
                prevLinkHtml: "<i class='fa fa-chevron-left'></i>",
                disableTimepicker: false,
                disableClearButton: false,
                defaultTime: null,
                dayAbbreviations: ["quickdate.Su", "quickdate.M", "quickdate.Tu", "quickdate.W", "quickdate.Th", "quickdate.F", "quickdate.Sa"],
                dateFilter: null,
                parseDateFunction: function (str) {
                    var d = new Date(str);
                    return d;
                }
            },
            $get: function () {
                return this.options;
            },
            set: function (keyOrHash, value) {
                var k, v, _results;
                if (typeof keyOrHash === 'object') {
                    _results = [];
                    for (k in keyOrHash) {
                        v = keyOrHash[k];
                        _results.push(this.options[k] = v);
                    }
                    return _results;
                } else {
                    this.options[keyOrHash] = value;
                }
            }
        };
    })
        .directive('ngEnter', function () {
            return function (scope, element, attr) {
                return element.bind('keydown keypress', function (e) {
                    if (e.which === 13) {
                        scope.$apply(attr.ngEnter);
                        return e.preventDefault();
                    }
                });
            };
        })
        .directive('onTab', function () {
            return {
                restrict: 'A',
                link: function (scope, element, attr) {
                    return element.bind('keydown keypress', function (e) {
                        if ((e.which === 9) && !e.shiftKey) {
                            return scope.$apply(attr.onTab);
                        }
                    });
                }
            };
        })
        .directive('quickDatepicker', function (ngQuickDateDefaults, $filter, $sce, $parse, $timeout) {
            return {
                restrict: "E",
                require: "?ngModel",
                scope: {
                    dateFilter: '=?',
                    onChange: "&",
                    required: '@',
                },
                replace: true,
                link: function (scope, element, attrs, ngModelCtrl) {
                    var dateToString, datepickerClicked, datesAreEqual, datesAreEqualToMinute, debounce, getDaysInMonth, initialize, parseDateString, refreshView, setCalendarDate, setConfigOptions, setInputFieldValues, setupCalendarView, stringToDate;
                    initialize = function () {
                        var templateDate;
                        setConfigOptions();
                        scope.toggleCalendar(false);
                        scope.weeks = [];
                        scope.inputDate = null;
                        scope.inputTime = null;
                        scope.invalid = true;

                        if (typeof attrs.initValue === 'string') {
                            ngModelCtrl.$setViewValue(attrs.initValue);
                        }
                        if (!scope.defaultTime) {
                            templateDate = new Date();
                            scope.datePlaceholder = $filter('date')(templateDate, scope.dateFormat);
                            scope.timePlaceholder = $filter('date')(templateDate, scope.timeFormat);
                        }
                        setCalendarDate();
                        return refreshView();
                    };

                    var isClickable = function (currentDate) {
                        var disableTimepicker = scope.disableTimepicker;
                        if (disableTimepicker) {
                            currentDate.setHours(0);
                            currentDate.setMinutes(0);
                            currentDate.setSeconds(0);
                        }
                        var currentTime = parseInt((currentDate.getTime()) / 1000);
                        var maxTime, minTime;
                        if (scope.minDate) {
                            if (disableTimepicker) {
                                scope.minDate.setHours(0);
                                scope.minDate.setMinutes(0);
                                scope.minDate.setSeconds(0);
                            }
                            minTime = parseInt((scope.minDate.getTime()) / 1000);
                        }

                        if (scope.maxDate) {
                            if (disableTimepicker) {
                                scope.maxDate.setHours(0);
                                scope.maxDate.setMinutes(0);
                                scope.maxDate.setSeconds(0);
                            }
                            maxTime = parseInt((scope.maxDate.getTime()) / 1000);
                        }
                        if (!scope.minDate && !scope.maxDate) {
                            return true;
                        }
                        if (scope.minDate && !scope.maxDate) {
                            return currentTime >= minTime;
                        }
                        if (!scope.minDate && scope.maxDate) {
                            return currentTime < maxTime;
                        }
                        if (scope.minDate && scope.maxDate) {
                            return currentTime >= minTime && currentTime < maxTime;
                        }
                    };
                    //watch model
                    scope.watchData = {};
                    angular.forEach(['minDate', 'maxDate'], function (key) {
                        if (attrs[key]) {
                            scope.$parent.$watch(attrs[key], function (value) {
                                scope[key] = value;
                                return refreshView();
                            });
                        }
                    });

                    setConfigOptions = function () {
                        var key, value;
                        for (key in ngQuickDateDefaults) {
                            value = ngQuickDateDefaults[key];
                            if (key.match(/[Hh]tml/)) {
                                scope[key] = $sce.trustAsHtml(ngQuickDateDefaults[key] || "");
                            } else if (!scope[key] && attrs[key]) {
                                scope[key] = attrs[key];
                            } else if (!scope[key]) {
                                scope[key] = ngQuickDateDefaults[key];
                            }
                        }
                        if (!scope.labelFormat) {
                            scope.labelFormat = scope.dateFormat;
                            if (!scope.disableTimepicker) {
                                scope.labelFormat += " " + scope.timeFormat;
                            }
                        }
                        if (attrs.iconClass && attrs.iconClass.length) {
                            scope.buttonIconHtml = $sce.trustAsHtml("<i ng-show='iconClass' class='" + attrs.iconClass + "'></i>");
                            return;
                        }
                    };
                    datepickerClicked = false;
                    //   window.document.addEventListener('click', function(event) {
                    //     if (scope.calendarShown && !datepickerClicked) {
                    //       scope.toggleCalendar(false);
                    //       scope.$apply();
                    //     }
                    //     return datepickerClicked = false;
                    //   });
                    angular.element(element[0])[0].addEventListener('click', function (event) {
                        datepickerClicked = true;
                        return;
                    });
                    refreshView = function () {
                        var date;
                        date = ngModelCtrl.$modelValue ? parseDateString(ngModelCtrl.$modelValue) : null;
                        setupCalendarView();
                        setInputFieldValues(date);
                        scope.mainButtonStr = date ? $filter('date')(date, scope.labelFormat) : scope.placeholder;
                        scope.invalid = ngModelCtrl.$invalid;
                        return;
                    };
                    setInputFieldValues = function (val) {
                        if (val) {
                            scope.inputDate = $filter('date')(val, scope.dateFormat);
                            scope.inputTime = $filter('date')(val, scope.timeFormat);
                        } else {
                            scope.inputDate = null;
                            scope.inputTime = null;
                        }
                    };
                    setCalendarDate = function (val) {
                        var d;
                        d = val ? new Date(val) : new Date();
                        if (d.toString() === "Invalid Date") {
                            d = new Date();
                        }
                        d.setDate(1);
                        scope.calendarDate = new Date(d);
                        return;
                    };
                    setupCalendarView = function () {
                        var curDate, d, day, daysInMonth, numRows, offset, row, selected, time, today, weeks, _i, _j, _ref;
                        offset = scope.calendarDate.getDay();
                        daysInMonth = getDaysInMonth(scope.calendarDate.getFullYear(), scope.calendarDate.getMonth());
                        numRows = Math.ceil((offset + daysInMonth) / 7);
                        weeks = [];
                        curDate = new Date(scope.calendarDate);
                        curDate.setDate(curDate.getDate() + (offset * -1));
                        for (row = _i = 0, _ref = numRows - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; row = 0 <= _ref ? ++_i : --_i) {
                            weeks.push([]);
                            for (day = _j = 0; _j <= 6; day = ++_j) {
                                d = new Date(curDate);
                                if (scope.defaultTime) {
                                    time = scope.defaultTime.split(':');
                                    d.setHours(time[0] || 0);
                                    d.setMinutes(time[1] || 0);
                                    d.setSeconds(time[2] || 0);
                                }
                                selected = ngModelCtrl.$modelValue && d && datesAreEqual(d, ngModelCtrl.$modelValue);
                                today = datesAreEqual(d, new Date());
                                weeks[row].push({
                                    date: d,
                                    selected: selected,
                                    disabled: typeof scope.dateFilter === 'function' ? !scope.dateFilter(d) : false,
                                    other: d.getMonth() !== scope.calendarDate.getMonth(),
                                    today: today,
                                    isClickable: isClickable(d)
                                });
                                curDate.setDate(curDate.getDate() + 1);
                            }
                        }
                        scope.weeks = weeks;
                        return;
                    };
                    ngModelCtrl.$parsers.push(function (viewVal) {
                        if (scope.required && !viewVal) {
                            ngModelCtrl.$setValidity('required', false);
                            return null;
                        } else if (angular.isDate(viewVal)) {
                            ngModelCtrl.$setValidity('required', true);
                            return viewVal;
                        } else if (angular.isString(viewVal)) {
                            ngModelCtrl.$setValidity('required', true);
                            return scope.parseDateFunction(viewVal);
                        } else {
                            return null;
                        }
                    });
                    ngModelCtrl.$formatters.push(function (modelVal) {
                        if (angular.isDate(modelVal)) {
                            return modelVal;
                        } else if (angular.isString(modelVal)) {
                            return scope.parseDateFunction(modelVal);
                        } else {
                            return void 0;
                        }
                    });
                    dateToString = function (date, format) {
                        return $filter('date')(date, format);
                    };
                    stringToDate = function (date) {
                        if (typeof date === 'string') {
                            return parseDateString(date);
                        } else {
                            return date;
                        }
                    };
                    parseDateString = ngQuickDateDefaults.parseDateFunction;
                    datesAreEqual = function (d1, d2, compareTimes) {
                        if (!compareTimes) {
                            compareTimes = false;
                        }
                        if (compareTimes) {
                            return (d1 - d2) === 0;
                        } else {
                            d1 = stringToDate(d1);
                            d2 = stringToDate(d2);
                            return d1 && d2 && (d1.getYear() === d2.getYear()) && (d1.getMonth() === d2.getMonth()) && (d1.getDate() === d2.getDate());
                        }
                    };
                    datesAreEqualToMinute = function (d1, d2) {
                        if (!(d1 && d2)) {
                            return false;
                        }
                        return parseInt(d1.getTime() / 60000) === parseInt(d2.getTime() / 60000);
                    };
                    getDaysInMonth = function (year, month) {
                        return [31, ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
                    };
                    debounce = function (func, wait) {
                        var args, context, later, result, timeout, timestamp;
                        timeout = args = context = timestamp = result = null;
                        later = function () {
                            var last;
                            last = +new Date() - timestamp;
                            if (last < wait && last > 0) {
                                timeout = setTimeout(later, wait - last);
                            } else {
                                timeout = null;
                            }
                        };
                        return function () {
                            context = this;
                            args = arguments;
                            timestamp = +new Date();
                            if (!timeout) {
                                timeout = setTimeout(later, wait);
                                result = func.apply(context, args);
                                context = args = null;
                            }
                            return result;
                        };
                    };
                    ngModelCtrl.$render = function () {
                        setCalendarDate(ngModelCtrl.$viewValue);
                        return refreshView();
                    };
                    ngModelCtrl.$viewChangeListeners.unshift(function () {
                        setCalendarDate(ngModelCtrl.$viewValue);
                        refreshView();
                        if (scope.onChange) {
                            return scope.onChange();
                        }
                    });
                    scope.$watch('calendarShown', function (newVal, oldVal) {
                        var dateInput;
                        if (newVal) {
                            dateInput = angular.element(element[0].querySelector(".quickdate-date-input"))[0];
                            return dateInput.select();
                        }
                    });
                    scope.toggleCalendar = debounce(function (show) {
                        if (isFinite(show)) {
                            scope.calendarShown = show;
                        } else {
                            scope.calendarShown = !scope.calendarShown;
                        }
                        return;
                    }, 150);
                    scope.selectDate = function (date, closeCalendar) {
                        var isTimeValid = false;
                        var changed;
                        if (!closeCalendar) {
                            closeCalendar = true;
                        }
                        if (date) {
                            var disableTimepicker = scope.disableTimepicker;
                            if (disableTimepicker) {
                                date.setHours(0);
                                date.setMinutes(0);
                                date.setSeconds(0);
                            }
                            var currentTime = parseInt((date.getTime()) / 1000);
                            var maxTime, minTime;
                            if (scope.minDate) {
                                if (disableTimepicker) {
                                    scope.minDate.setHours(0);
                                    scope.minDate.setMinutes(0);
                                    scope.minDate.setSeconds(0);
                                }
                                minTime = parseInt((scope.minDate.getTime()) / 1000);
                            }

                            if (scope.maxDate) {
                                if (disableTimepicker) {
                                    scope.maxDate.setHours(0);
                                    scope.maxDate.setMinutes(0);
                                    scope.maxDate.setSeconds(0);
                                }
                                maxTime = parseInt((scope.maxDate.getTime()) / 1000);
                            }
                            if (!scope.minDate && !scope.maxDate) {
                                isTimeValid = true;
                            }
                            if (scope.minDate && !scope.maxDate) {
                                isTimeValid = currentTime >= minTime;
                            }
                            if (!scope.minDate && scope.maxDate) {
                                isTimeValid = currentTime < maxTime;
                            }
                            if (scope.minDate && scope.maxDate) {
                                isTimeValid = currentTime >= minTime && currentTime < maxTime;
                            }
                        }
                        changed = (!ngModelCtrl.$viewValue && date) || (ngModelCtrl.$viewValue && !date) || ((date && ngModelCtrl.$viewValue) && (date.getTime() !== ngModelCtrl.$viewValue.getTime()));
                        if (typeof scope.dateFilter === 'function' && !scope.dateFilter(date)) {
                            return false;
                        }
                        if ((isTimeValid && date) || !date) {
                            ngModelCtrl.$setViewValue(date);
                            scope.toggleCalendar(false);
                        } else {
                            console.log('时间格式错误');
                            return isTimeValid;
                        }
                        if (closeCalendar) {
                            scope.toggleCalendar(false);
                        }
                        return true;
                    };
                    scope.selectDateFromInput = function (closeCalendar) {
                        var err, tmpDate, tmpDateAndTime, tmpTime;
                        if (!closeCalendar) {
                            closeCalendar = false;
                        }
                        try {
                            tmpDate = new Date(scope.inputDate.replace(/[-]/g, '/')); //Date.parse(scope.inputDate.replace(/[-]/g,'/'));//parseDateString(scope.inputDate);
                            if (!scope.inputDate) {
                                throw 'Invalid Date';
                            }
                            var date = scope.inputTime ? (scope.inputDate + " " + scope.inputTime) : scope.inputDate;
                            if (isNaN(Date.parse(date.replace(/[-]/g, '/')))) {
                                throw 'Invalid Date';
                            }
                            if (!scope.disableTimepicker && scope.inputTime && scope.inputTime.length && tmpDate) {
                                tmpTime = scope.disableTimepicker ? '00:00:00' : scope.inputTime;
                                tmpDateAndTime = new Date((scope.inputDate + " " + tmpTime).replace(/[-]/g, '/'));
                                if (!tmpDateAndTime) {
                                    throw 'Invalid Time';
                                }
                                tmpDate = tmpDateAndTime;
                            }
                            if (!datesAreEqualToMinute(ngModelCtrl.$viewValue, tmpDate)) {
                                console.log(tmpDate);
                                if (!scope.selectDate(tmpDate, false)) {
                                    throw 'Invalid Date';
                                }
                            }
                            if (closeCalendar) {
                                scope.toggleCalendar(false);
                            }
                            scope.inputDateErr = false;
                            scope.inputTimeErr = false;
                            return;
                        } catch (_error) {
                            err = _error;
                            if (err === 'Invalid Date') {
                                scope.inputDateErr = true;
                                return;
                            } else if (err === 'Invalid Time') {
                                scope.inputTimeErr = true;
                                return;
                            }
                        }
                    };
                    scope.onDateInputTab = function () {
                        if (scope.disableTimepicker) {
                            scope.toggleCalendar(false);
                        }
                        return true;
                    };
                    scope.onTimeInputTab = function () {
                        scope.toggleCalendar(false);
                        return true;
                    };
                    scope.nextMonth = function () {
                        setCalendarDate(new Date(new Date(scope.calendarDate).setMonth(scope.calendarDate.getMonth() + 1)));
                        return refreshView();
                    };
                    scope.prevMonth = function () {
                        setCalendarDate(new Date(new Date(scope.calendarDate).setMonth(scope.calendarDate.getMonth() - 1)));
                        return refreshView();
                    };
                    scope.clear = function () {
                        return scope.selectDate(null, true);
                    };

                    $('body').on('click', function (e) {
                        var $target = $(e.target);
                        if ($target !== element && $target.parents('.quickdate').length === 0) {
                            $timeout(function () {
                                scope.toggleCalendar(false);
                                refreshView();
                            }, 0);
                        }
                    });
                    return initialize();
                },
                template: require('./../templates/date-picker.jade')
            };
        });
};
