var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyHtml = require('gulp-minify-html');
var stylus = require('gulp-stylus');
var minifyCss = require('gulp-minify-css');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var install = require('gulp-install');
var livereload = require('gulp-livereload');

var angularPath = './angular';
var publicPath = angularPath.concat('/public');
var angularModulePath = angularPath.concat('/js/module.js');
var angularJsPath = angularPath.concat('/js/**/*.js');
var angularStylusPath = angularPath.concat('/stylus/**/*.styl');
var angularIndexPath = angularPath.concat('/index.html');
var angularTemplatesPath = angularPath.concat('/templates/**/*.html');
var excludeAngularBowerComponents = '!'.concat(angularJsPath).concat('bower_components/**');

var nodePath = './server-node';
var nodeScriptPath = nodePath.concat('/index.js');
var excludeServerNodeModules = '!'.concat(nodePath).concat('node_modules/**');

gulp.task('angularDependencies', function () {
    gulp.src(angularPath.concat('/package.json'))
        .pipe(install());

    gulp.src(angularPath.concat('/node_modules/**'))
        .pipe(gulp.dest(publicPath.concat('/node_modules')));
});

gulp.task('nodeDependencies', function () {
    gulp.src([nodePath.concat('/package.json')])
        .pipe(install());
});

gulp.task('dependencies', ['angularDependencies', 'nodeDependencies']);

gulp.task('html', function () {
    var minifyHtmlOptions = {
        spare: true
    };

    gulp.src([angularIndexPath, angularTemplatesPath])
        .pipe(minifyHtml(minifyHtmlOptions))
        .pipe(gulp.dest(publicPath))
        .pipe(livereload());
});

gulp.task('concatJs', function () {
    gulp.src([angularModulePath, angularJsPath])
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(publicPath))
        .pipe(livereload());
});

gulp.task('stylus', function () {
    gulp.src(angularStylusPath)
        .pipe(concat('style.css'))
        .pipe(stylus())
        .pipe(minifyCss())
        .pipe(gulp.dest(publicPath))
        .pipe(livereload());
});

gulp.task('hint', function () {
    gulp.src([nodePath, excludeServerNodeModules, angularJsPath, excludeAngularBowerComponents])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch:angular', function () {
    gulp.watch([angularModulePath, angularJsPath], ['hint', 'concatJs'], function (file) {
        console.log('reloading because of change in: ' + file.path);
    });

    gulp.watch(angularStylusPath, ['stylus'], function (file) {
        console.log('reloading because of change in: ' + file.path);
    });

    gulp.watch([angularIndexPath, angularTemplatesPath], ['html'], function (file) {
        console.log('reloading because of change in: ' + file.path);
    });
});

gulp.task('dev:angular', ['html', 'concatJs', 'stylus', 'watch:angular']);

gulp.task('dev:node', function () {
    nodemon({
        script: nodeScriptPath,
        ext: 'js',
        ignore: ['angular*', 'gulp*', 'public*']
    });
});

gulp.task('dev', ['hint', 'dependencies', 'dev:angular', 'dev:node'], function () {
    livereload.listen();
});
