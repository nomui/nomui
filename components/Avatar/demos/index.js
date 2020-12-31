define([
  './basic.js',
  './shape.js',
  './size.js',
  './with-icon.js',
  './with-img.js',
  './change-gap.js',
], function () {
  return {
    title: 'Avatar',
    subtitle: '头像',
    demos: Array.prototype.slice.call(arguments),
  }
})
