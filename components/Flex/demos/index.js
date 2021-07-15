define([
  './rows.js',
  './cols.js',
  './rows-cols.js',
  './shorthand.js',
  './align-justify-fills.js',
  './gap.js',
  './gutter.js',
  './flex-item.js',
  './rows-fit.js',
], function () {
  return {
    title: 'Flex',
    subtitle: '弹性布局',
    demos: Array.prototype.slice.call(arguments),
  }
})
