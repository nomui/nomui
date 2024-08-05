define([
  './basic.js',
  './vertical.js',
  './wrap.js',
  './align-justify-fills.js',
  './gap.js',
  './with-data-list.js',
], function () {
  return {
    title: 'Flex2',
    subtitle: '弹性布局2',
    demos: Array.prototype.slice.call(arguments),
  }
})
