'use strict'
 
const gulp     = require('gulp'),
      sass     = require('gulp-sass'),
      prefixer = require('gulp-autoprefixer'),
      minifier = require('gulp-clean-css'),
      rename   = require('gulp-rename'),
      concat   = require('gulp-concat-css')

sass.compiler = require('node-sass')
 
gulp.task('sass:compile', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/css/'))
})

gulp.task('sass:prefixer', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(prefixer({
            cascade: true
        }))
})

gulp.task('sass:minify', function () {
    return gulp.src('./src/css/**/*.css')
        .pipe(minifier({
            compatibility: 'ie8'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./src/dist/'))
})

gulp.task('sass:bundle', function () {
    return gulp.src('./src/dist/**/*.min.css')
        .pipe(concat('./src/build/framework.css'))
        .pipe(minifier())
        .pipe(gulp.dest('.'))
})

gulp.task('sass:watch', function () {
    gulp.watch('./src/sass/**/*.scss', function () {
        gulp.series('sass:compile', 'sass:prefixer', 'sass:minify', 'sass:bundle', 'sass:watch')()
    })
})