'use strict'

const gulp     = require('gulp'),
      sass     = require('gulp-sass'),
      prefixer = require('gulp-autoprefixer')

sass.compiler = require('sass')

gulp.task('sass:compile', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass({
          outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./src/css/'))
})

gulp.task('sass:prefixer', function () {
    return gulp.src('./src/css/**/*.css')
        .pipe(prefixer())
})

gulp.task('sass:watch', function () {
    gulp.watch(['./src/sass/**/*.scss', '!./src/sass/functions', '!./src/sass/config'], function () {
        gulp.series('sass:compile', 'sass:prefixer', 'sass:watch')()
    })
}) 