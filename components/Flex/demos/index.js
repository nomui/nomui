define([
  './rows.js',
  './cols.js',
  './rows-cols.js',
  './align-justify-fills.js',
  './gap.js',
  './gutter.js',
  './rows-fit.js',
  './shorthand.js',
], function () {
  return {
    title: 'Flex',
    subtitle: '弹性布局',
    demos: Array.prototype.slice.call(arguments),
  }
})
