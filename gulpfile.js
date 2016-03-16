var gulp = require('gulp');
var minifyHTML = require('gulp-minify-html');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var minifyCSS = require('gulp-minify-css');

var banner = ['/**',
    ' * Map attack',
    ' * 2015 by panagiop',
    ' * License: MIT',
    ' * Last Updated: <%= new Date().toUTCString() %>',
    ' */',
    ''].join('\n');

gulp.task('minifyjs', function() {
  gulp.src([
      'client/bower_components/angular/angular.js',
      'client/bower_components/angular-ui-router/release/angular-ui-router.js',
      'client/bower_components/angular-resource/angular-resource.js',
    //   'client/public/js/lib/*.js',
      'client/public/js/app.js',
      'client/public/js/**/*.js',
      'client/bower_components/jquery/dist/jquery.js',
      'client/bower_components/bootstrap/dist/js/bootstrap.js',
      'client/bower_components/socket.io-client/socket.io.js',
      'client/bower_components/lodash/lodash.js',
      'client/bower_components/ngmap/build/scripts/ng-map.min.js'
    //   'client/public/theme/assets/js/*.js'
    ])
    .pipe(concat('app.min.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('client/public/js'));
});

// minify new or changed HTML pages
gulp.task('minifyhtml', function() {
  	var htmlSrc = [
      'client/views/partials/**/*.html',
      'client/public/js/common/directives/**/*.html'
    ],
      htmlDst = 'client/public/templates';

	gulp.src(htmlSrc)
		.pipe(minifyHTML())
		.pipe(gulp.dest(htmlDst));
});

gulp.task('minifycss', function() {
  gulp.src([
    'client/public/theme/assets/css/*.css',
    'client/public/theme/assets/css/custom-style.css',
    'client/bower_components/bootstrap/dist/css/bootstrap.css'
  ])
    .pipe(concat('styles.min.css'))
    .pipe(minifyCSS({processImport: false}))
    .pipe(gulp.dest('client/public/css'));
});

gulp.task('watch', function() {
  gulp.watch([
    'client/public/theme/assets/css/*.css',
    '!client/css/styles.min.css'
    ], ['minifycss']);

  gulp.watch([
    'client/public/js/**/*.js',
    'client/public/js/app.js'
  ], ['minifyjs']);

  gulp.watch([
      'client/views/partials/**/*.html'
  ], ['minifyhtml']);
});

gulp.task('default', ['watch', 'minifycss', 'minifyjs', 'minifyhtml']);
