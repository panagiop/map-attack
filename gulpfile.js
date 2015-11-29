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
      'client/public/js/lib/angular.min.js',
      'client/public/js/lib/angular-ui-router.min.js',
      'client/public/js/lib/angular-resource.min.js',
      'client/public/js/lib/*.js',
      'client/public/js/app.js',
      'client/public/js/**/*.js',
      'client/public/theme/assets/js/jquery.min.js',
      'client/public/theme/assets/js/bootstrap.min.js',
      'client/public/theme/assets/js/*.js'
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
    'client/public/theme/assets/css/custom-style.css'
  ])
    .pipe(concat('styles.min.css'))
    .pipe(minifyCSS({processImport: false}))
    .pipe(gulp.dest('client/public/css'));
}); 

gulp.task('watch', function() {
  gulp.watch([
    'client/public/css/cuctom-style.css', 
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
