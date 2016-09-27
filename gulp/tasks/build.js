'use strict';

var gulp       = require('gulp');
// var buildTasks = require('../config').buildTasks;

var runSequence = require('run-sequence');
gulp.task('build', function() {
	runSequence('clean', 'env', 'browserify', 'iconfont', 'sass', 'images', 'html');
});
