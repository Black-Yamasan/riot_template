var gulp = require('gulp');
var webpackStream = require('webpack-stream');
var webpack = require('webpack');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var cache = require('gulp-cached');
var changed = require('gulp-changed');
var rename = require('gulp-rename');
var gulpif = require('gulp-if');
var minimist = require('minimist');
var del = require('del');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');

const webpackConfig = require('./webpack.config');

var destDir = './dist/';
var prodDir = './htdocs/';
var options = minimist(process.argv.slice(2), config);
var config = {
	string: 'env',
	default: { env: process.env.NODE_ENV || 'dev'}
}
var isProd = (options.env === 'prod') ? true : false;
console.log('[build env]', options.env, '[isProd]', isProd);

gulp.task('browser-sync', function(){
	browserSync.init({
		server: {
			baseDir: destDir
		}
	});
});

gulp.task('sass', function() {
  return gulp.src(['src/pc/styles/**/*.scss'])
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sass( {
      outputStyle: 'expanded'
    }))
		.pipe(rename(function (path) {
			path.dirname = 'css'
		}))
		.pipe(autoprefixer({
      browsers: ['last 2 version', 'iOS >= 9', 'Android >= 4.6'],
      cascade: false
    }))
		.pipe(gulpif(isProd, cleanCss()))
    .pipe(gulpif(!isProd, gulp.dest(destDir)))
		.pipe(gulpif(isProd, gulp.dest(prodDir)))
});


gulp.task('html', function() {
	return gulp.src(['src/pc/html/**/*.html'])
	.pipe(gulpif(!isProd, gulp.dest(destDir + '/')))
	.pipe(gulpif(isProd, gulp.dest(prodDir + '/')))
});


gulp.task('images', function() {
	return gulp.src(['src/pc/images/**/'])
	.pipe(gulpif(!isProd, gulp.dest(destDir + 'images/')))
	.pipe(gulpif(isProd, gulp.dest(prodDir + 'images/')))
});

gulp.task('webpack', function() {
	return webpackStream(webpackConfig, webpack)
	.pipe(gulpif(!isProd, gulp.dest(destDir + 'js/riot/')))
	.pipe(gulpif(isProd, gulp.dest(prodDir + 'js/riot/')))
});


gulp.task('bs-reload', function(){
	browserSync.reload();
});

gulp.task('clean', del.bind(null, prodDir));

gulp.task('build', ['sass', 'images', 'webpack', 'html'], function() {
});


gulp.task('default', ['browser-sync', 'sass', 'images', 'webpack', 'html'], function() {
	watch(['src/pc/styles/**/*.scss'], function() {
		return runSequence(
			'sass',
			'bs-reload'
		);
	});
	watch(['src/pc/tags/**/*.tag', 'src/pc/js/app.js'], function() {
		return runSequence(
			'webpack',
			'bs-reload'
		)
	});
	watch(['src/pc/images/**/*'], function() {
		return runSequence(
			'images',
			'bs-reload'
		);
	});
	watch(['src/pc/html/**/*'], function() {
		return runSequence(
			'html',
			'bs-reload'
		);
	});
});
