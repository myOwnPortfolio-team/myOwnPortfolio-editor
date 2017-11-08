const gulp = require('gulp');

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

gulp.task('package', ['package:compilation', 'package:json', 'package:main']);
