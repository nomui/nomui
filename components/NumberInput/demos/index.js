define([
  './basic.js',
  './disabled.js',
  './min-max.js',
  './precision.js',
  './limit-input.js',
], function () {
  return {
    title: 'Numberbox',
    subtitle: '数字框',
    demos: Array.prototype.slice.call(arguments),
  }
})
