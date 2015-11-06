 /*global require */

var gulp = require('gulp'),
uglify = require('gulp-uglify'),
uglifycss = require('gulp-uglifycss'),
minifycss = require('gulp-minify-css'),
concat = require('gulp-concat'),
imagemin = require('gulp-imagemin'),
htmlreplace = require('gulp-html-replace'),
rename = require('gulp-rename'),
del = require('del');

// delete the build directory
gulp.task('clean', function() {
  return del(['build/']);
});

gulp.task('js', ['clean'], function () {
  gulp.src(['js/**/*.js', '!js/vendor/jquery-2.1.4.min.js',
      '!js/config.js'])
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build/js/'));
  gulp.src(['js/vendor/jquery-2.1.4.min.js'])
    .pipe(gulp.dest('build/js/'));
  return gulp.src(['js/config.js'])
    .pipe(gulp.dest('build/js/'));
});

gulp.task('css', ['js'], function () {
  return gulp.src(['css/main.css'])
    .pipe(minifycss())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('build/css/'));
});

gulp.task('image', ['css'], function () {
  return gulp.src(['img/*', 'img/*/*'])
    .pipe(imagemin())
    .pipe(gulp.dest('build/img/'));
});

gulp.task('root', ['image'], function () {
  return gulp.src(['*.html', '*.php', '*.txt', '*.png', '*.xml',
      '*.ico', '*.json', '.htaccess'])
    .pipe(gulp.dest('build/'));
});

gulp.task('htmladjust', ['root'], function () {
  return gulp.src(['build/index.html'])
    .pipe(htmlreplace({
    'cssheader': 'css/main.min.css',
    'jsfooter': 'js/app.js'
  })).pipe(gulp.dest('build/'));
});

gulp.task('default', ['clean', 'root', 'js', 'css',
  'image', 'htmladjust']);
