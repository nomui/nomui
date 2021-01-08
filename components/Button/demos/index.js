define([
  './basic.js',
  './bg-color.js',
  './size.js',
  './with-icon.js',
  './shape.js',
  './link.js',
], function () {
  return {
    title: 'Button',
    subtitle: '按钮',
    demos: Array.prototype.slice.call(arguments),
  }
})
