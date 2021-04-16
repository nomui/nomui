define([
  './basic.js',
  './disabled.js',
  './align.js',
  './percent.js',
  './currency.js',
  './customize.js',
], function () {
  return {
    title: 'NumberSpinner',
    subtitle: '数值微调器',
    demos: Array.from(arguments),
  }
})
