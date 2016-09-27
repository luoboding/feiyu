'use strict';

var gulp         = require('gulp');
var sass         = require('gulp-sass');
var plumber      = require('gulp-plumber');
var errorHandler = require('../utils/error-handler');
var size         = require('gulp-size');
var config       = require('../config').sass;
var cleanCss    = require('gulp-clean-css');
var gulpif       = require('gulp-if');
var lazypipe     = require('lazypipe');
var path         = require('path');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', ['images'], function() {
	var compress = lazypipe().pipe(cleanCss, {keepSpecialComments: 0});
	return gulp.src(config.src)
  			.pipe(plumber({errorHandler: errorHandler}))
  			.pipe(sass())
			.pipe(autoprefixer({
	  			//browsers: ['Android 2.3','iOS 6'],
	  			browsers: ["> 0%"],
	  			cascade: false
  			}))
  			.pipe(gulpif(global.release, compress()))
  			.pipe(size())
  			.pipe(gulp.dest(config.dest));
});
