const gulp = require("gulp");
const path = require("path");
const gutil = require("gulp-util");
const sourcemaps = require('gulp-sourcemaps');
const merge = require("merge2");
const uglify = require('gulp-uglify-es').default;
const headerComment = require("gulp-header-comment");
let config = require("./../config");
const rename = require("gulp-rename");
gulp.task('uglify', function () {
    gulp.src(path.join(config.dist,"**.js"))
        .pipe(uglify())
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(rename({suffix:".min"}))
        .pipe(headerComment(config.header))
        .pipe(gulp.dest(config.dist));
});