var jshint  = require('gulp-jshint');
var gulp    = require('gulp');
var plumber = require('gulp-plumber');
var config  = require('../config').jshint;

gulp.task('jshint', function() {
  return gulp.src(config.src)    
    .pipe(jshint())
    .pipe(jshint.reporter());
});
