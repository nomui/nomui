define([
  './basic.js',
  './position.js',
  './disabled-option.js',
  './disabled.js',
  './multiple.js',
  './max-tags.js',
  './value.js',
  './show-array.js',
  './custom.js',
  './extra-options.js',
  './searchable-local.js',
  './searchable-remote.js',
  './other.js',
  // './virtual.js',
], function () {
  return {
    title: 'Select',
    subtitle: '下拉选择',
    demos: Array.prototype.slice.call(arguments),
  }
})
