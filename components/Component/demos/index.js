define([
  './basic.js',
  './placeholder.js',
  './elements.js',
  './children.js',
  './update.js',
  './auto-render-false.js',
], function () {
  return {
    title: 'Structure',
    subtitle: '结构',
    demos: Array.prototype.slice.call(arguments),
  }
})
