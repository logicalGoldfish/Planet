var gulp = require('gulp');
var del = require('del');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var karma = require('karma').server;
// var watch = require('gulp-watch');

var handleError = function(err) {
  console.log('ERROR MSG:', error.toString());
  this.emit('end');
};

// Default, runs on 'gulp' command
gulp.task('default', ['clean', 'test'], function() {
  gulp.start('scripts');
});

// Jshint, concats, uglifies scripts into dist
gulp.task('scripts', function() {
  return gulp.src('src/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify({
      beautify: true
    }))
    .on('error', handleError)
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(notify({message: 'Scripts task complete'}));
});

// Runs Karma tests
gulp.task('test', function(done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function() {
    done();
  });
});

// Deletes what's in dist
gulp.task('clean', function(cb) {
  del(['dist/assets/js'], cb)
});

gulp.task('watch', function() {
  // Create LiveReload server
  // livereload.listen();
  // gulp.watch(['dist/**']).on('change', livereload.changed);
  gulp.watch('src/scripts/*.js', ['scripts']);
});
