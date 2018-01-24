const gulp = require("gulp");
const gulpsync = require('gulp-sync')(gulp);
gulp.task("build", ["typescript:build"]);


