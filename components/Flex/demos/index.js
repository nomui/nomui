define([
  './rows.js',
  './cols.js',
  './rows-cols.js',
  './align-justify-fills.js',
  './rows-gap.js',
  './cols-gap.js',
  './rows-fit.js',
], function () {
  return {
    title: 'Flex',
    subtitle: '弹性布局',
    demos: Array.prototype.slice.call(arguments),
  }
})
