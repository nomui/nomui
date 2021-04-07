const gulp = require('gulp')
const less = require('gulp-less')
const rename = require('gulp-rename')
const { rollup } = require('rollup')
const chalk = require('chalk')
const { default: banner } = require('rollup-plugin-banner')
const { version } = require('./package.json')

function buildJs(cb) {
  rollup({
    input: 'components/index.js',
    plugins: [
      banner(`
      nomui v${version}
      License: MIT
      Copyright (c) 2021-2021, Wetrial
    `),
    ],
  }).then(
    ({ write }) => {
      write({
        file: 'dist/nomui.js',
        format: 'umd',
        name: 'nomui',
      })
      cb()
    },
    (err) => {
      console.log(chalk.red(err.toString()))
      cb()
    },
  )
}

function buildLess(cb) {
  gulp
    .src('components/index.less')
    .pipe(less())
    .on('error', function (err) {
      console.log(chalk.red(err.toString()))
      cb()
    })
    .pipe(rename({ basename: 'nomui' }))
    .pipe(gulp.dest('./dist'))

  cb()
}

function watchChange(cb) {
  gulp.watch('components/**/*.less', buildLess)
  gulp.watch('components/**/*.js', buildJs)
  cb()
}

exports.build = gulp.series(buildLess, buildJs)

exports.default = gulp.parallel(buildLess, buildJs, watchChange)
