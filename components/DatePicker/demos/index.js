define([
  './basic.js',
  './extra.js',
  './disabled.js',
  './disabledTime.js',
  './with-format.js',
  './with-time.js',
  './mindate-mintime.js',
  './week-mode.js',
], function () {
  return {
    title: 'DatePicker',
    subtitle: '日期',
    demos: Array.prototype.slice.call(arguments),
  }
})
