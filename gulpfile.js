const gulp = require('gulp')
const less = require('gulp-less')
const rename = require('gulp-rename')
const { rollup } = require('rollup')

function buildJs(cb) {
  rollup({
    input: 'components/index.js',
  }).then(({ write }) => {
    write({
      file: 'dist/nomui.js',
      format: 'umd',
      name: 'nomui',
    })
    cb()
  })
}

function buildLess(cb) {
  gulp
    .src('components/index.less')
    .pipe(less())
    .pipe(rename({ basename: 'nomui' }))
    .pipe(gulp.dest('./dist'))
  cb()
}

function watchChange(cb) {
  gulp.watch('components/**/*.less', buildLess)
  gulp.watch('components/**/*.js', buildJs)
  cb()
}

exports.build = gulp.parallel(buildLess, buildJs)

exports.default = gulp.parallel(buildLess, buildJs, watchChange)
