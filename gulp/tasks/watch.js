'use strict';

var gulp = require('gulp');
var config = require('./../config');

gulp.task('watch', ['setWatch', 'env', 'browserify', 'iconfont', 'sass', 'images'], function() {

	gulp.watch(config.jshint.src, ['jshint']);
	gulp.watch(config.html.src, ['html']);
	gulp.watch(config.sass.src, ['sass']);
	gulp.watch(config.images.src, ['images']);

});
