var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var openURL = require('open');
var lazypipe = require('lazypipe');
var runSequence = require('run-sequence');
var history = require('connect-history-api-fallback');

var paths = {
    scripts: './www/js',
    styles: './www/css',
    views: './www/views/**/*.html',
    typescript: './app/**/*.ts',
    sass: './scss/**/*.scss'
};

var compile_typescript = lazypipe()
    .pipe($.sourcemaps.init)
    .pipe($.typescript, {
        sortOutput: true,
        removeComments: true,
        target: 'ES5'
    })
    .pipe($.concat, 'app.js')
    .pipe($.sourcemaps.write)
    .pipe(gulp.dest, paths.scripts);

gulp.task('compile-typescript', function(){
    gulp.src(paths.typescript)
        .pipe(compile_typescript());
});

var compile_sass = lazypipe()
    .pipe($.sass.sync)
    .pipe(gulp.dest, paths.styles);

gulp.task('compile-sass', function(){
    gulp.src(paths.sass)
        .pipe(compile_sass());
});

gulp.task('watch', function() {
    $.watch(paths.sass)
        .pipe($.plumber())
        .pipe(compile_sass())
        .pipe($.connect.reload());
        
  $.watch(paths.views)
        .pipe($.plumber())
        .pipe($.connect.reload());        
        
    $.watch(paths.typescript, $.batch(function(events, done) {
        gulp.start('compile-typescript', function () {
            gulp.src(paths.typescript)
                .pipe($.connect.reload());
            done();
        });
    }));
});

gulp.task('start:client', ['compile-typescript', 'compile-sass', 'start:server'], function () {
  openURL('http://localhost:9000');
});

gulp.task('start:server', function() {
    $.connect.server({
        root: ['www'],
        livereload: true,
        port: 9000,
        middleware: function (connect, opt) {
            return [ history({}) ];
        }
    });
});

gulp.task('serve', function (cb) {
  runSequence('start:client',
    'watch',
    cb);
});

gulp.task('default', ['compile-typescript', 'compile-sass']);
