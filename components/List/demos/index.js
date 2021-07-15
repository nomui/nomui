define([
  './basic.js',
  './empty.js',
  './disabled.js',
  './integration.js',
  './scroll-to.js',
  './virtual.js',
  './data.js',
  './sortable.js',
], function () {
  return {
    title: 'List',
    subtitle: '列表',
    demos: Array.prototype.slice.call(arguments),
  }
})
