
"use strict";

var gulp = require('gulp');
var config = require('../config').iconfont;
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');

gulp.task('iconfont', function() {

	return gulp.src(config.src)
		.pipe(iconfont({
			fontName: config.fontName,
			normalize: true,
			centerHorizontally: true
		}))
		.on('codepoints', function(codepoints, options) {
			var options = {
				glyphs: codepoints,
				fontName: config.fontName,
				fontPath: './../fonts/',
				className: 'g-icon'
			};

			gulp.src(config.cssTemplate)
				.pipe(consolidate('lodash', options))
				.pipe(gulp.dest(config.css));

		})
		.pipe(gulp.dest(config.dest));

});