"use strict";
var requireDir = require("require-dir");
global.dir = __dirname;
requireDir("./gulp/tasks", {
	recurse: true
});