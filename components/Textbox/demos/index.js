define([
  './basic.js',
  './disabled.js',
  './autofocus.js',
  './with-icon.js',
  './events.js',
], function () {
  return {
    title: 'Textbox',
    subtitle: '文本框',
    demos: Array.prototype.slice.call(arguments),
  }
})
