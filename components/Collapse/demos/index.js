define([
  './basic.js',
  './accordion.js',
  './border.js',
  './iconOnly.js',
  './customIcon.js',
  './active-key.js',
  './active-key-array.js',
], function () {
  return {
    title: 'Collapse',
    subtitle: '折叠',
    demos: Array.prototype.slice.call(arguments),
  }
})
