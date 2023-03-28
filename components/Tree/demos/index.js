define([
  './basic.js',
  './selectable.js',
  './checkable.js',
  './sortable.js',
  './flat-data.js',
  './icon.js',
  './node-defaults.js',
  './fit.js',
  './expand-to.js',
  './scroll-to.js',
  './load-data.js',
], function () {
  return {
    title: 'Tree',
    subtitle: '树',
    demos: Array.prototype.slice.call(arguments),
  }
})
