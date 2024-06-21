define([
  './basic.js',
  './folder.js',
  './accept.js',
  './data.js',
  './file-list.js',
  './default-file-list.js',
  './method.js',
  './custom.js',
], function () {
  return {
    title: 'Upload',
    subtitle: '基础上传组件',
    demos: Array.prototype.slice.call(arguments),
  }
})
