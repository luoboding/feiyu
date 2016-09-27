'use strict';

var gulp = require('gulp');
var config = require('./../config').html;
var jade = require('gulp-jade');

gulp.task('html', function() {
	var YOUR_LOCALS = {};
	gulp.src(config.src)
		.pipe(jade({
			locals: YOUR_LOCALS
		}))
		.pipe(gulp.dest(config.dest));
});
