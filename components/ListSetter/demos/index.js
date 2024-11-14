define([
  './basic.js', './custom.js',
], function () {
  return {
    title: 'ListSetter',
    subtitle: '列表设置器',
    demos: Array.prototype.slice.call(arguments),
  }
})
