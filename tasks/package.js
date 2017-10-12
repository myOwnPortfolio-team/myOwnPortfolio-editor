const gulp = require('gulp');
const deleteLines = require('gulp-delete-lines');

const appPath = './app';
const distPath = './dist';

gulp.task('package:json', () => gulp
  .src('package.json')
  .pipe(gulp.dest(`${distPath}/package/`)));

gulp.task('package:main', () => gulp
  .src('main.js')
  .pipe(gulp.dest(`${distPath}/package/`)));

gulp.task('package:html', () => gulp
  .src(`${appPath}/**/*.html`)
  .pipe(deleteLines({
    filters: [
      /<script\s+src=["']http:\/\/localhost:8080\/dist\/package\/app\/js\/bundle\.js/i,
    ],
  }))
  .pipe(gulp.dest(`${distPath}/package/app/`)));

gulp.task('package', ['package:json', 'package:main', 'package:html']);
