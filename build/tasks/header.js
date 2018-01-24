const gulp = require("gulp");
const gutil = require("gulp-util");
const config = require("../config");
const path = require("path");
const debug = require("gulp-debug");
const headerComment = require("gulp-header-comment");
gulp.task("header", function(){
    gulp.src(path.join(config.dist,'**/*.js'))
        .pipe(headerComment(config.header))
        .pipe(gulp.dest(config.dist));
});


