const gulp = require("gulp");
const gulpsync = require('gulp-sync')(gulp);
const config = require("./config");
gulp.task("dist", gulpsync.sync([
    'clean-dist',
    "typescript:build",
    'uglify',
    "header"
]));


