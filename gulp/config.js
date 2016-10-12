var argv = require('yargs')
	.default('release', false)
	.default('ENV', 'dev')
	.argv;

var configMapping = {
    dev: {
        api: 'http://feiyu.taskdoing.com/platform'
    }
};

global.project = '';
global.src = './app';
global.dest = './dest';
global.release = argv.release;
var config = configMapping[argv.ENV];
global.api = config.api;

module.exports = {
	envFolder: './envs/',
	server : './dest/',
	jshint: {
		src: global.src + '/components/**/*.js'
	},
	inject: {
		src: global.dest + '/js/index.js',
		dest: global.dest + '/index.html',
		destDir: global.dest + '/js'
	},
	images: {
		src: global.src + '/assets/images/**',
		dest: global.dest + '/assets/images'
	},
	html: {
		src: global.src + '/index.jade',
		dest: global.dest
	},
	sass: {
		src: global.src + '/assets/styles/**/*.scss',
		dest: global.dest + '/assets/styles'
	},
	bower: {
		dest: global.dest + '/js/vendors'
	},
	browserify: {
		debug: !global.release,
		extensions: [],
		transformList : [
			"debowerify",
			"yamlify",
			["jadeify", {
				"compileDebug": !global.release,
				"pretty": true
			}]
		],
		entries: global.src + '/components/index.js',
		dest: global.dest + '/assets/js'
	}
};
