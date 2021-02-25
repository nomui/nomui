define([
  './basic.js',
  './tab-operator.js',
  './uistyle.js',
  './separate.js',
  './fit.js',
], function () {
  return {
    title: 'Tabs',
    subtitle: '选项卡',
    demos: Array.prototype.slice.call(arguments),
  }
})
