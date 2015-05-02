var gulp    = require('gulp'),
    jshint  = require('gulp-jshint'),
    uglify  = require('gulp-uglify'),
    rename  = require('gulp-rename');


gulp.task('server', function() {
  connect.server();
});

gulp.task('lint', function() {
  return gulp.src([
    'lib/backbone-facebook-login.js',
  ])
  .pipe(jshint())
  .pipe(jshint.reporter('default', { verbose: true }))
  .pipe(jshint.reporter('fail'));
});

gulp.task('build', function() {
  return gulp.src(['lib/backbone-facebook-login.js'])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('lib/'))
});