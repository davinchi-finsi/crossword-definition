const gulp = require("gulp");
const ts = require("gulp-typescript");
const path = require("path");
const gutil = require("gulp-util");
const gulpif = require("gulp-if");
const sourcemaps = require('gulp-sourcemaps');
const merge = require("merge2");
const uglify = require('gulp-uglify');
let config = require("./../config");
//client
(function () {
    let tsProject = ts.createProject(path.resolve(config.src, "tsconfig-umd.json"));
    let tsFiles = path.resolve(config.src, "**/*.ts");
    debugger;
    gulp.task("typescript-umd:build", function () {
        let tsresult = gulp.src(tsFiles)
            .pipe(tsProject());

        return merge([
            tsresult.pipe(gulpif(config.sourcemap == true, sourcemaps.init())),
            tsresult.pipe(gulpif(config.sourcemap == true, sourcemaps.write())),
            tsresult.js.pipe(gulp.dest(config.dist))
        ])
    });
    gulp.task('typescript-umd:watch', function () {
        gutil.log("Waiting for ts changes");
        gulp.watch(tsFiles, ['typescript:build']);
    });
})();