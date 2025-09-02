define([
  './basic.js',
  './onlyleaf.js',
  './multiple.js',
  './extra-tools.js',
  './allow-clear.js',
  './flat-options.js',
  './searchable-local.js',
  './searchable-remote.js',
], function () {
  return {
    title: 'TreeSelect',
    subtitle: '下拉树选择',
    demos: Array.prototype.slice.call(arguments),
  }
})
