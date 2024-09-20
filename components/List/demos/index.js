define([
  './basic.js',
  './empty.js',
  './disabled.js',
  './load-more.js',
  './integration.js',
  './scroll-to.js',
  './virtual.js',
  './data.js',
  './item-selectable.js',
  './sortable.js',
], function () {
  return {
    title: 'List',
    subtitle: '列表',
    demos: Array.prototype.slice.call(arguments),
  }
})
