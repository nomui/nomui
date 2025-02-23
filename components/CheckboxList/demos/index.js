define([
  './basic.js',
  './render.js',
  './disabled-option.js',
  './disabled.js',
  './show-hide-option.js',
  './cols.js',
  './value-options.js',
], function () {
  return {
    title: 'CheckboxList',
    subtitle: '多选列表',
    demos: Array.prototype.slice.call(arguments),
  }
})
