define([
  './basic.js',
  './with-duration.js',
  './with-button.js',
  './with-key.js',
  './with-type.js',
  './with-align.js',
  './custom.js',
  './download-progress.js',
], function () {
  return {
    title: 'Notification',
    subtitle: '通知',
    demos: Array.prototype.slice.call(arguments),
  }
})
