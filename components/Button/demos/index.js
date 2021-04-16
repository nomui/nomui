define([
  './type.js',
  './size.js',
  './shape.js',
  './ghost.js',
  './danger.js',
  './with-icon.js',

  './link.js',
], function () {
  return {
    title: 'Button',
    subtitle: '按钮',
    demos: Array.prototype.slice.call(arguments),
  }
})
