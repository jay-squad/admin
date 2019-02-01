'use strict'

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.paths = {
    dist: 'dist',
};

var paths = gulp.paths;


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {

    browserSync.init({
        port: 3000,
        server: "./",
        ghostMode: false,
        notify: false,
	index: "./home.html"
    });

    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('**/*.html').on('change', browserSync.reload);
    gulp.watch('js/**/*.js').on('change', browserSync.reload);

});



// Static Server without watching scss files
gulp.task('serve:lite', function () {

    browserSync.init({
        server: "./",
        ghostMode: false,
        notify: false
    });

    gulp.watch('**/*.css').on('change', browserSync.reload);
    gulp.watch('**/*.html').on('change', browserSync.reload);
    gulp.watch('js/**/*.js').on('change', browserSync.reload);

});

gulp.task('sass', function () {
    return gulp.src('./scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

gulp.task('sass:watch', function () {
    gulp.watch('./scss/**/*.scss');
});


gulp.task('default', ['serve']);
