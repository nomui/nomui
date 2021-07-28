define([
  './basic.js',
  './disabled.js',
  './count.js',
  './allowClear.js',
  './allowHalf.js',
  './character.js',
  './tooltips.js',
], function () {
  return {
    title: 'Rate',
    subtitle: '评分',
    demos: Array.from(arguments),
  }
})
