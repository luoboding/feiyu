'use strict';
var gulp   = require('gulp');
var bower  = require('gulp-bower');
var config = require('../config.js').bower;

gulp.task('bower', function() {
	return bower().pipe(gulp.dest(config.dest));
});