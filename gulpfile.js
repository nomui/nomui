const gulp = require('gulp')
const less = require('gulp-less')
const rename = require('gulp-rename')

function buildLess(cb) {
  gulp
    .src('components/index.less')
    .pipe(less())
    .pipe(rename({ basename: 'nomui' }))
    .pipe(gulp.dest('./dist'))
  cb()
}

function watchLess(cb) {
  gulp.watch('components/**/*.less', buildLess)
  cb()
}

exports.default = gulp.parallel(buildLess, watchLess)
