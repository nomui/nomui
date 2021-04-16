define([
  './basic.js',
  './disabled.js',
  './auto-height.js',
  './limit-rows.js',
  './events.js',
], function () {
  return {
    title: 'Multiline Textbox',
    subtitle: '多行文本框',
    demos: Array.prototype.slice.call(arguments),
  }
})
