define([
  './basic.js',
  './checkable.js',
  './checkable-checked-keys.js',
  './methods.js',
  './callback.js',
], function () {
  return {
    title: 'Tree',
    subtitle: '树',
    demos: Array.prototype.slice.call(arguments),
  }
})
