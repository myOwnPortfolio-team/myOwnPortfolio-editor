const gulp = require('gulp');
const clean = require('gulp-clean');

const distPath = './dist';

gulp.task('clean:app', () => gulp
  .src(`${distPath}`)
  .pipe(clean()));

gulp.task('clean:modules', () => gulp
  .src('./node_modules')
  .pipe(clean()));
