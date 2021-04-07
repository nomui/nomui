define([
  './basic.js',
  './steps.js',
  './circle.js',
  './width.js',
  './dynamic.js',
  './dashboard.js',
  './format.js',
  './stroke-linecap.js',
  './gap-degree.js',
  './success.js',
  './linear-gradient.js',
], function () {
  return {
    title: 'Progress',
    subtitle: '进度条',
    demos: Array.prototype.slice.call(arguments),
  }
})
