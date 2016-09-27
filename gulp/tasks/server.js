'use strict';

var gulp      = require('gulp');
var connect = require('gulp-connect');
var config    = require('../config').server;

gulp.task('server', function() {
	connect.server({
	    root: config,
		port: 8088,
	    livereload: true
	 });
});
