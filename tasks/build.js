const gulp = require('gulp');
const electron = require('gulp-atom-electron');
const symdest = require('gulp-symdest');
const clean = require('gulp-clean');

const distPath = './dist';

gulp.task('build:osx', ['build:clean:osx'], () => gulp
  .src(`${distPath}/package/**`)
  .pipe(electron({
    version: '1.7.9',
    platform: 'darwin',
    darwinIcon: `${distPath}/app/assets/icons/app.icns`,
  }))
  .pipe(symdest(`${distPath}/platform/osx`)));

gulp.task('build:win32', ['build:clean:win32'], () => gulp
  .src(`${distPath}/package/**`)
  .pipe(electron({
    version: '1.7.9',
    platform: 'win32',
    winIcon: `${distPath}/app/assets/icons/app.ico`,
  }))
  .pipe(symdest(`${distPath}/platform/win32`)));

gulp.task('build:linux', ['build:clean:linux'], () => gulp
  .src(`${distPath}/package/**`)
  .pipe(electron({ version: '1.7.9', platform: 'linux' }))
  .pipe(symdest(`${distPath}/platform/linux`)));


gulp.task('build:clean:osx', () => gulp
  .src(`${distPath}/platform/osx`)
  .pipe(clean()));

gulp.task('build:clean:win32', () => gulp
  .src(`${distPath}/platform/win32`)
  .pipe(clean()));

gulp.task('build:clean:linux', () => gulp
  .src(`${distPath}/platform/linux`)
  .pipe(clean()));

gulp.task('build', ['build:osx', 'build:win32', 'build:linux']);
