var gulp = require('gulp');
var karma = require('karma').server;
// var watch = require('gulp-watch');
var runSequence = require('run-sequence');
var browserify = require('browserify');
var run = require('gulp-run');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var nodemon = require('gulp-nodemon');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var reactify = require('reactify');
var buffer = require('vinyl-buffer');
// var livereload = require('gulp-livereload');


var path = {
  sources: {
    ENTRY_POINT: __dirname + '/client/src/main.jsx',
    HTML: [__dirname + '/client/index.html', __dirname + '/client/login.html', __dirname + '/client/'],
    CSS: __dirname + '/client/css/*.css',
    JS: [__dirname + '/client/*.js', __dirname + '/client/src/**/*.js'],
    ALL: [__dirname + '/client/src/*.js', __dirname + '/client/src/**/*.js', __dirname + '/client/css/*.css', __dirname + '/client/index.html', __dirname + '/client/login.html'],
    ASSETS: [__dirname + '/client/assets']
  },
  dest: {
    OUT: 'LenderBee.js',
    MINIFIED_OUT: 'lenderbee.min.js',
    DEST_SRC: 'client/dist/src',
    DEST_BUILD: 'client/dist/build',
    DEST: 'client/dist',
    DEST_ASSETS: 'client/dist/assets',
    JS: 'client/dist/src'
  },
  karmaConf: __dirname + '/karma.conf.js'
};

// files to concat into final build
// TODO: Needs to be updated with correct paths
var filesToUglify = [
  // paths.src.bower + '/',
  // paths.src.bower + '/',
  // paths.src.bower + '/',
  // paths.dist.public + '/'
];


var handleError = function(err) {
  console.log(err.toString());
  this.emit('end');
};

// TODO: file paths needs to be updated
gulp.task('uglify', function() {
  // return gulp.src(filesToUglify)
  //   .pipe(concat('lenderbee.js'))
  //   .pipe(gulp.dest(paths.dist.js));
});

// Cleans client/dist folder
// TODO: confirm this is working...
gulp.task('clean', function() {
  return gulp.src(path.dest.DEST)
    .pipe(clean({
      force: true
    }))
    .on('error', handleError);   
});

// calls browserify task
gulp.task('javascript', function(callback) {
  runSequence('browserify', callback);
});

// copies html/assets file into dist
gulp.task('copy', function(){
  gulp.src(path.sources.HTML, {base: 'client/'}).pipe(gulp.dest(path.dest.DEST));
  gulp.src('client/assets/**/*').pipe(gulp.dest(path.dest.DEST_ASSETS));
});

// compiles jsx --> js
gulp.task('browserify', function() {
  var bundler = browserify({
    entries: [path.sources.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  });
  var watcher = watchify(bundler);

  return watcher
  .on('update', function() {
    var updateStart = Date.now();
    console.log('Updating!');
    watcher.bundle()
    .pipe(source(path.dest.OUT))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(path.dest.JS));
    console.log('Updated!');
  })
  .bundle()
  .pipe(source(path.dest.OUT))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest(path.dest.JS));
  console.log('first build');
  // return gulp.src(path.sources.ENTRY_POINT)
  //   .pipe(browserify({
  //     debug: false,
  //     transform: ['reactify'],
  //   }))
  //   .on('error', handleError)
  //   .pipe(rename(path.dest.OUT))
  //   .pipe(gulp.dest(path.dest.JS))
});

// paths to watch
gulp.task('watch', function() {
  // gulp.watch(path.sources.JS, ['javascript']);
  // gulp.watch(path.sources.ASSETS + '/**/*', ['image']);
});

// starts server and restarts on change
gulp.task('nodemon', function() {
  nodemon({
    script: 'server/app.js',
    env: {
      'NODE_ENV': 'development'
    }
  })
  .on('restart');
});

// Makes sure nodemon is run after build
gulp.task('server', function() {
  gulp.start('nodemon');
});

// deployment build
// gulp.task('build', function() {
//   runSequence('clean', 'javascript');
// });

// Default Task
gulp.task('default', ['clean'], function(cb){
  runSequence('copy', 'javascript', 'server', cb)
});
