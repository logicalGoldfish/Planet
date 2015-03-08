var gulp = require('gulp');
var karma = require('karma').server;
var watch = require('gulp-watch');
var runSequence = require('run-sequence');
var browserify = require('gulp-browserify');
var run = require('gulp-run');
var compass = require('gulp-compass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var image = require('gulp-image');

var paths = {
  src: {
    bower: './client/bower_components',
    img: './client/img',
    scss: './client/scss',
    js: './client/app',
    fonts: './client/fonts'
  },
  dist: {
    public: './public',
    css: './public/css',
    img: './public/img',
    js: './public/js',
    fonts: './public/fonts'
  },
  karmaConf: __dirname + '/spec/_karma.conf.js'
};

// files to concat into final build
var filesToUglify = [
  paths.src.bower + '/jquery/dist/jquery.min.js',
  paths.src.bower + '/foundation/js/foundation.min.js',
  paths.src.bower + '/foundation/js/foundation/foundation.orbit.js',
  paths.dist.public + '/js/app.bundled.js'
];

var handleError = function(err) {
  console.log(err.toString());
  this.emit('end');
};

gulp.task('uglify', function() {
  return gulp.src(filesToUglify)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.dist.js));
});

gulp.task('clean', function() {
  return gulp.src(paths.dist.public)
    .pipe(clean({
      force: true
    }))
    .on('error', handleError);   
});

gulp.task('javascript', function(callback) {
  runSequence('browserify', 'uglify', callback);
});

gulp.task('fonts', function() {
  return gulp.src(paths.src.fonts + '/**/*')
    .pipe(gulp.dest(paths.dist.fonts));
});

gulp.task('image', function() {
  return gulp.src(paths.src.img + '/**/*')
    .pipe(image())
    .pipe(gulp.dest(paths.dist.img));
});

gulp.task('lint', function() {});

gulp.task('test', function() {});

gulp.task('scss', function() {
  return gulp.src(paths.src.scss + '/app.scss')
    .pipe(compass({
      css: paths.dist.css,
      sass: paths.src.scss
    }))
    .on('error', handleError)
    .pipe(gulp.dest(paths.dist.css));
});

gulp.task('browserify', function() {
  return gulp.src(paths.src.js + '/app.js')
    .pipe(browserify({
      debug: false, // disable source maps
      transform: ['reactify'],
    }))
    .on('error', handleError)
    .pipe(rename('app.bundled.js'))
    .pipe(gulp.dest(paths.dist.js))
});

gulp.task('seed', function(done) {
  run('node seed.js').exec(function() {
    done();
  });
});

gulp.task('karma', function(done) {
  return karma.start({
    configFile: paths.karmaConf,
    singleRun: true
  }, done);
});

// folders to watch
gulp.task('watch', function() {
  gulp.watch(paths.src.js + '/**/*.js', ['javascript']);
  gulp.watch(paths.src.scss + '/**/*.scss', ['scss']);
  gulp.watch(paths.src.img + '/**/*', ['image']);
});

// build for deploys
gulp.task('build', function() {
  runSequence('clean', 'javascript', 'scss', 'image', 'fonts');
});

// Default Task
gulp.task('default', ['image', 'lint', 'test', 'javascript', 'scss', 'watch']);