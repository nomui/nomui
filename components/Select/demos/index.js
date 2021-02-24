define([
  './basic.js',
  './disabled-option.js',
  './multiple.js',
  './value.js',
  './show-array.js',
  './custom.js',
], function () {
  return {
    title: 'Select',
    subtitle: '下拉选择',
    demos: Array.prototype.slice.call(arguments),
  }
})
