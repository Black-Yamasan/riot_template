const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const watch = require('gulp-watch');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const gulpif = require('gulp-if');
const minimist = require('minimist');
const del = require('del');
const browserSync = require('browser-sync').create();
const runSequence = require('run-sequence');

const webpackConfig = require('./webpack.config');

const destDir = './dist/';
const prodDir = './htdocs/';
const config = {
	string: 'env',
	default: { env: process.env.NODE_ENV || 'dev'}
}
const options = minimist(process.argv.slice(2), config);

let isProd = (options.env === 'prod') ? true : false;
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
