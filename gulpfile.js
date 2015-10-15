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
  return del('build/');
});

gulp.task('js', ['clean'], function () {
  gulp.src(['js/**/*.js', '!js/vendor/modernizr-2.8.3-custom.min.js',
    '!js/vendor/jquery-2.1.4.min.js', '!js/egg-mover.js'])
  .pipe(uglify())
  .pipe(concat('app.js'))
  .pipe(gulp.dest('build/js/'));
  gulp.src(['js/vendor/jquery-2.1.4.min.js', 'js/vendor/modernizr-2.8.3-custom.min.js',
   'js/egg-mover.js'])
  .pipe(gulp.dest('build/js/'));
});

gulp.task('css', ['clean'], function () {
  gulp.src('css/main.css')
  .pipe(minifycss())
  .pipe(rename('main.min.css'))
  .pipe(gulp.dest('build/css/'));
});

gulp.task('image', ['clean'], function () {
  gulp.src(['img/*', 'img/*/*'])
  .pipe(imagemin())
  .pipe(gulp.dest('build/img/'));
});

gulp.task('root', ['clean'], function () {
  gulp.src('work/**/*', { "base" : 'work'})
  .pipe(gulp.dest('build/work/'));
  return gulp.src(['*.html', '*.php', '*.txt', '*.png', '*.xml', '*.ico', '*.json', '.htaccess'])
  .pipe(gulp.dest('build/'));
});

gulp.task('htmladjust', ['root'], function () {
  gulp.src('build/header.html')
  .pipe(htmlreplace({
    'jsheader': 'js/modernizr-2.8.3-custom.min.js',
    'cssheader': 'css/main.min.css'
  }))
  .pipe(gulp.dest('build/'));
  gulp.src('build/footer.html')
  .pipe(htmlreplace({
    'jsfooter': 'js/app.js'
  }))
  .pipe(gulp.dest('build/'));
  gulp.src('build/404.html')
  .pipe(htmlreplace({
    'jsfooter': 'js/app.js'
  }))
  .pipe(gulp.dest('build/'));
});

gulp.task('default', ['clean', 'root', 'js', 'css', 'image', 'htmladjust']);
