var gulp = require('gulp');
var del = require('del');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var karma = require('karma').server;
var eventStream = require('event-stream');
var order = require('gulp-order');
// var watch = require('gulp-watch');

var paths = {
  src: {
    main: 'client/src/*.js',
    components: 'client/src/*/*.js'
  },
  karmaConf: __dirname + '/karma.conf.js'
};

var handleError = function(err) {
  console.log('ERROR MSG:', err.toString());
  this.emit('end');
};

// Default, runs on 'gulp' command
gulp.task('default', ['clean', 'test'], function() {
  gulp.start('scripts');
});

// Jshint, concats, uglifies scripts into dist
gulp.task('scripts', function() {
  var appFiles = gulp.src(paths.src.main)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .on('error', handleError)
    .pipe(concat('app.temp.js'));

  var componentFiles = gulp.src(paths.src.components)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .on('error', handleError)
    .pipe(concat('components.temp.js'));

  return eventStream.concat(appFiles, componentFiles)
    .pipe(order([
      'app.temp.js',
      'components.temp.js'
    ]))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('client/dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('client/dist/assets/js'))
    .pipe(notify({message: 'Tests and scripts task complete'}));
});

// Runs Karma tests
gulp.task('test', function(done) {
  karma.start({
    configFile: paths.karmaConf,
    singleRun: true
  }, function() {
    done();
  });
});

// Deletes what's in dist
gulp.task('clean', function(cb) {
  del(['dist/assets/js'], cb)
});

// gulp.task('watch', function() {
//   // Create LiveReload server
//   // livereload.listen();
//   // gulp.watch(['dist/**']).on('change', livereload.changed);
//   gulp.watch('src/scripts/*.js', ['scripts']);
// });
