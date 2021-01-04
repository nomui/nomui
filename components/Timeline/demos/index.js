define([
  './basic.js',
  './color.js',
  './toggle-reverse.js',
  './custom-dot.js',
  './mode-alternate.js',
  './mode-right.js',
  './label.js',
], function () {
  return {
    title: 'Timeline',
    subtitle: '时间轴',
    demos: Array.prototype.slice.call(arguments),
  }
})
