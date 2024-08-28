define([
  './basic.js',
  './step.js',
  './disabled.js',
  './min-max.js',
  './precision.js',
  './string-mode.js',
  './controls.js',
  './formatter.js',
], function () {
  return {
    title: 'NumberInput',
    subtitle: '纯数字输入框',
    demos: Array.prototype.slice.call(arguments),
  }
})
