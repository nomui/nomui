define([
  './basic.js',
  './disabled-option.js',
  './disabled.js',
  './multiple.js',
  './value.js',
  './show-array.js',
  './custom.js',
  './search.js',
], function () {
  return {
    title: 'Select',
    subtitle: '下拉选择',
    demos: Array.prototype.slice.call(arguments),
  }
})
