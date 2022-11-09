define([
  './basic.js',
  './format.js',
  './extra.js',
  './default-value.js',
  './min-date.js',
  './get-date-string.js',
], function () {
  return {
    title: 'PartialDatePicker',
    subtitle: '部分日期选择',
    demos: Array.prototype.slice.call(arguments),
  }
})
