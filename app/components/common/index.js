'use strict';
var ngModule = angular.module('app.common', ['angularFileUpload']);

require('./extensions/date')();
require('./services/global-interceptor')(ngModule);
require('./services/http-resource')(ngModule);
require('./services/storage')(ngModule);
require('./services/loader')(ngModule);
require('./services/layout')(ngModule);
require('./services/modal')(ngModule);
require('./services/user')(ngModule);

require('./constants/config.js')(ngModule);
require('./directives/simditor')(ngModule);
require('./directives/numeric')(ngModule);
require('./directives/input-formatter')(ngModule);
require('./directives/max-byte-length')(ngModule);
require('./directives/choose-address')(ngModule);
require('./directives/file-uploader')(ngModule);
require('./directives/quick-date-picker')(ngModule);
require('./directives/bind-html-unsafe')(ngModule);

require('./filters/paramater-filter')(ngModule);
require('./filters/date-filter')(ngModule);
require('./filters/prize-type-filter')(ngModule);
