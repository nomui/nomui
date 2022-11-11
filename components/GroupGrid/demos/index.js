define([
  './basic.js',
  './add-default-value.js',
  './events.js',
  './field-hidden.js',
  './field-width.js',
  './action-render.js',
], function () {
  return {
    title: 'GroupGrid',
    subtitle: '字段组表格',
    demos: Array.prototype.slice.call(arguments),
  }
})
