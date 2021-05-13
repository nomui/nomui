define([
  './success.js',
  './info.js',
  './warning.js',
  './error.js',
  './403.js',
  './404.js',
  './500.js',
  './custom-icon.js',
], function () {
  return {
    title: 'Result',
    subtitle: '结果',
    demos: Array.prototype.slice.call(arguments),
  }
})
