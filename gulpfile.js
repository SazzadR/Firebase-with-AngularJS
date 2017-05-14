var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');


gulp.task('scripts', function () {
    return gulp.src('js/**/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('stylesheets', function () {
    gulp.src('css/**/*.css')
        .pipe(concat('app.css'))
        .pipe(minify({keepBreaks: true}))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css'))
    ;
});

gulp.task('watch', function () {
    gulp.watch('js/**/*.js', ['scripts']);
    gulp.watch('css/**/*.css', ['stylesheets']);
});

gulp.task( 'default', [ 'scripts', 'stylesheets', 'watch' ] );
