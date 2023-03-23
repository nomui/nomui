define([
  './basic.js',
  './accept.js',
  './data.js',
  './file-list.js',
  './default-file-list.js',
  './custom.js',
], function () {
  return {
    title: 'UploaderCore',
    subtitle: '上传服务',
    demos: Array.prototype.slice.call(arguments),
  }
})
