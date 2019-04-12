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
const runSequence = require('gulp4-run-sequence');

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

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: destDir
    }
  });
});

gulp.task('sass', () => {
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


gulp.task('html', () => {
  return gulp.src(['src/pc/html/**/*.html'])
  .pipe(gulpif(!isProd, gulp.dest(destDir + '/')))
  .pipe(gulpif(isProd, gulp.dest(prodDir + '/')))
});


gulp.task('images', () => {
  return gulp.src(['src/pc/images/**/'])
  .pipe(gulpif(!isProd, gulp.dest(destDir + 'images/')))
  .pipe(gulpif(isProd, gulp.dest(prodDir + 'images/')))
});

gulp.task('webpack', () => {
  return webpackStream(webpackConfig, webpack)
  .on('error', function handleError() {
  this.emit('end');
  })
  .pipe(gulpif(!isProd, gulp.dest(destDir + 'js/')))
  .pipe(gulpif(isProd, gulp.dest(prodDir + 'js/')))
});


gulp.task('bs-reload', () => {
  browserSync.reload();
});

gulp.task('clean', del.bind(null, prodDir));


gulp.task('build', gulp.series(
  gulp.parallel('sass', 'webpack', 'html', 'images')
));


gulp.task('default', gulp.series(
  gulp.parallel('browser-sync', 'sass', 'webpack', 'html', 'images', () => {
    watch(['src/pc/styles/**/*.scss'], () => {
      return runSequence(
        'sass',
        'bs-reload'
      );
    });
    watch(['src/pc/tags/**/*.tag', 'src/pc/js/app.js'], () => {
      return runSequence(
        'webpack',
        'bs-reload'
      );
    });
    watch(['src/pc/images/**/*'], () => {
      return runSequence(
        'images',
        'bs-reload'
      );
    });
    watch(['src/pc/html/**/*'], () => {
      return runSequence(
        'html',
        'bs-reload'
      );
    });
  })
));
