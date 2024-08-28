define([
  './basic.js',
  './disabled.js',
  './min-max.js',
  './precision.js',
  './string-mode.js',
  './controls.js',
  './formatter.js',
], function () {
  return {
    title: 'Numberbox',
    subtitle: '数字框',
    demos: Array.prototype.slice.call(arguments),
  }
})
