const gulp = require('gulp');
const electron = require('gulp-atom-electron');
const symdest = require('gulp-symdest');

const distPath = './dist';

gulp.task('build:osx', () => gulp
  .src(`${distPath}/package/**`)
  .pipe(electron({ version: '1.7.9', platform: 'darwin' }))
  .pipe(symdest(`${distPath}/platform/osx`)));

gulp.task('build:win32', () => gulp
  .src(`${distPath}/package/**`)
  .pipe(electron({ version: '1.7.9', platform: 'win32' }))
  .pipe(symdest(`${distPath}/platform/win32`)));

gulp.task('build:linux', () => gulp
  .src(`${distPath}/package/**`)
  .pipe(electron({ version: '1.7.9', platform: 'linux' }))
  .pipe(symdest(`${distPath}/platform/linux`)));

gulp.task('build', ['build:osx', 'build:win32', 'build:linux']);
