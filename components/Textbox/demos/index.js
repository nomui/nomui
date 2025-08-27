define([
  './basic.js',
  './allowClear.js',
  './disabled.js',
  './readonly.js',
  './autofocus.js',
  './auto-width.js',
  './with-icon.js',
  './with-button.js',
  './word-limit.js',
  './on-enter.js',
  './events.js',
], function () {
  return {
    title: 'Textbox',
    subtitle: '文本框',
    demos: Array.prototype.slice.call(arguments),
  }
})
