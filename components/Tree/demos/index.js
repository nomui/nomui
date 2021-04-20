define([
  './basic.js',
  './selectable.js',
  './checkable.js',
  './sortable.js',
  './flat-data.js',
], function () {
  return {
    title: 'Tree',
    subtitle: '树',
    demos: Array.prototype.slice.call(arguments),
  }
})
