var gulp = require('gulp');
var coffeelint = require('gulp-coffeelint');
 
gulp.task('lint', function () {
    gulp.src('./**/*.cson')
        .pipe(coffeelint())
        .pipe(coffeelint.reporter())
});