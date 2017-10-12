const gulp = require('gulp');

const appPath = './app';
const distPath = './dist';

gulp.task('package:json', () => gulp
  .src('package.json')
  .pipe(gulp.dest(`${distPath}/app/`)));

gulp.task('package:main', () => gulp
  .src('main.js')
  .pipe(gulp.dest(`${distPath}/app/`)));

gulp.task('package:html', () => gulp
  .src(`${appPath}/**/*.html`)
  .pipe(gulp.dest(`${distPath}/app/`)));

gulp.task('package', ['package:json', 'package:main', 'package:html']);
