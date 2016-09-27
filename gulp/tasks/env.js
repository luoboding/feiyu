'use strict';

var gulp = require('gulp');
var env = global.api;
var writeFile = require('fs').writeFile;
gulp.task('env', function() {
    var string = '"use strict";\nmodule.exports = {\n\t"remoteHost": "' + env + '"\n};';
    writeFile(global.dir + '/app/components/env.conf.js', string, function(err, data) {
        console.log('err is ', err);
    });
});
