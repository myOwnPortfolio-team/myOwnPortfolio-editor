const gulp = require('gulp');
const rename = require('gulp-rename');

const distPath = './dist';

gulp.task('package:json', () => gulp
  .src('package.json')
  .pipe(gulp.dest(`${distPath}/package/`)));

gulp.task('package:main', () => gulp
  .src('main.js')
  .pipe(gulp.dest(`${distPath}/package/`)));

gulp.task('package:compilation', () => gulp
  .src(`${distPath}/app/**/*`)
  .pipe(gulp.dest(`${distPath}/package/app/`)));

gulp.task('package:properties:app', () => gulp
  .src('properties/app.json')
  .pipe(gulp.dest(`${distPath}/package/properties`)));

gulp.task('package:properties:electron', () => gulp
  .src('properties/electron.prod.json')
  .pipe(rename('electron.json'))
  .pipe(gulp.dest(`${distPath}/package/properties`)));

gulp.task('package', [
  'package:compilation',
  'package:json',
  'package:main',
  'package:properties:app',
  'package:properties:electron',
]);
