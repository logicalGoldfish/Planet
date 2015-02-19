var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var nodemon = require('gulp-nodemon');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var karma = require('karma').server;
var del = require('del');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var karma = require('karma').server;
var eventStream = require('event-stream');
var order = require('gulp-order');
var mui = './node_modules/material-ui/src';

var path = {
  HTML: 'client/index.html',
  MINIFIED_OUT: 'LenderBee.min.js',
  OUT: 'LenderBee.js',
  DEST: 'client/dist',
  DEST_BUILD: 'client/dist/build',
  DEST_SRC: 'client/dist/src',
  ENTRY_POINT: './client/src/main.jsx',
};

var paths = {
  src: {
    main: 'client/src/*.js',
    components: 'client/src/*/*.js'
  },
  karmaConf: __dirname + '/karma.conf.js'
};

var handleError = function(err) {
  console.log('ERROR MSG:', error.toString());
  this.emit('end');
};

// Copies html page for production
gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

// Removes node_modules for maintenance
gulp.task('clean-npm', function(){
  gulp.src('./node_modules/', {read: false})
    .pipe(clean());
});

// Watches for changes and rebuilds production files
gulp.task('watch', function() {
  gulp.watch(path.HTML, ['copy']);
  gulp.watch(path.LESS_WATCH, ['less']);

  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function() {
    watcher.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC));
    console.log('Updated');
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});

// Builds files for production
gulp.task('build', function(){
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify]
  })
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify(path.MINIFIED_OUT)))
    .on('error', handleError)
    .pipe(gulp.dest(path.DEST_BUILD))
    .pipe(notify({message: 'Build task complete'}));
});

// minifies html? Not sure what this does. is copy necessary then?
gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

// Starts server and restarts on change
gulp.task('nodemon', function() {
  nodemon({
    script: 'server/app.js',
    env: {
      'NODE_ENV': 'development'
    }
  })
    .on('restart');
});

gulp.task('lint', function() {
  return gulp.src(path.OUT)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

// Jshint, concats, uglifies scripts into dist
// gulp.task('scripts', function() {
//   var appFiles = gulp.src(paths.src.main)
//     .pipe(jshint())
//     .pipe(jshint.reporter('default'))
//     .on('error', handleError)
//     .pipe(concat('app.temp.js'));

//   var componentFiles = gulp.src(paths.src.components)
//     .pipe(jshint())
//     .pipe(jshint.reporter('default'))
//     .on('error', handleError)
//     .pipe(concat('components.temp.js'));

//   return eventStream.concat(appFiles, componentFiles)
//     .pipe(order([
//       'app.temp.js',
//       'components.temp.js'
//     ]))
//     .pipe(concat('main.js'))
//     .pipe(gulp.dest('client/dist/assets/js'))
//     .pipe(rename({suffix: '.min'}))
//     .pipe(uglify())
//     .pipe(gulp.dest('client/dist/assets/js'))
//     .pipe(notify({message: 'Tests and scripts task complete'}));
// });

// Runs Karma tests & jsHint
gulp.task('test', ['lint'], function(done) {
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


// Builds production files
gulp.task('production', ['clean', 'replaceHTML', 'build']);

// Default gulp task
gulp.task('default', ['test', 'watch', 'nodemon']);
