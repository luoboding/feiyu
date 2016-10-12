'use strict';

var gulp       = require('gulp');
// var buildTasks = require('../config').buildTasks;

var runSequence = require('run-sequence');
gulp.task('build', function() {
	runSequence('clean', 'browserify', 'sass', 'images', 'html');
});
