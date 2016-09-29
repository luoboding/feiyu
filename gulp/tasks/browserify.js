'use strict';

var gulp         = require('gulp');
var browserify   = require('browserify');
var watchify     = require('watchify');
var bundleLogger = require('../utils/bundle-logger');
var source       = require('vinyl-source-stream');
var buffer       = require('vinyl-buffer');
var transform    = require('vinyl-transform');
var errorHandler = require('./../utils/error-handler');
var ngAnnotate   = require('gulp-ng-annotate');
var uglify       = require('gulp-uglify');
var gulpif       = require('gulp-if');
var lazypipe     = require('lazypipe');
var config       = require('../config').browserify;
var size         = require('gulp-size');
var glob         = require("glob");
var path         = require('path');
var yamlify      = require('yamlify');
var md5          = require("gulp-md5-plus");
var inject       = require('../config').inject;


gulp.task('browserify', ['bower'], function () {

	var isDebug = !global.release;

	var browserifyThis = function (file) {
		var bundler = browserify({
			// Required watchify args
			cache: {},
			packageCache: {},
			basedir: '',

			fullPaths: isDebug,
			// Specify the entry point of your app
			entries: file,
			// Add file extentions to make optional in your requires
			extensions: config.extensions,
			// Enable source maps!
			debug: isDebug
		});

		config.transformList.forEach(function(transformItem){
			if(Array.isArray(transformItem)){
				bundler.transform(
					transformItem[0],transformItem[1]
				);
			}else{
				bundler.transform(transformItem);
			}
		});

		var bundle = function () {
			// Log when bundling starts
			bundleLogger.start(file);

			var compress = lazypipe()
				.pipe(ngAnnotate)
				.pipe(uglify);

			var baseDir = config.baseDir ? config.baseDir : path.dirname(file) + '/';
			var newFileName = file.replace(baseDir, '');
			return bundler
					.bundle()
					.on('error', errorHandler)
					.pipe(source(newFileName))
					.pipe(buffer())
					.pipe(gulpif(!isDebug, compress()))
					.pipe(size())
					.pipe(gulpif(!isDebug, md5(10 ,inject.dest)))
					.pipe(gulp.dest(config.dest))
					.on('end', reportFinished);
		};

		if (global.isWatching) {
			// Wrap with watchify and rebundle on changes
			bundler = watchify(bundler);
			// Rebundle on update
			bundler.on('update', bundle);
		}

		var reportFinished = function () {
			// Log when bundling completes
			bundleLogger.end(file);
		};

		return bundle();
	};

	function LoopEntries(entries) {
		glob(entries, function (er, files) {
			files.forEach(function (file) {
				browserifyThis(file);
			});
		})
	}

	if (Array.isArray(config.entries)) {
		config.entries.forEach(LoopEntries)
	} else {
		LoopEntries(config.entries)
	}


});
