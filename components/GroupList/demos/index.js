define([
  './basic.js',
  './add-default-value.js',
  './hide-action.js',
  './action-render.js',
], function () {
  return {
    title: 'GroupList',
    subtitle: '字段组列表',
    demos: Array.prototype.slice.call(arguments),
  }
})
