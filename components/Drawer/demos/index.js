define([
  './basic.js',
  './container.js',
  './backdrop.js',
  './view.js',
  './async-view.js',
  './custom-footer.js',
  './size.js',
  './settle.js',
  './custom-ok-cancel.js',
], function () {
  return {
    title: 'Drawer',
    subtitle: '抽屉',
    demos: Array.prototype.slice.call(arguments),
  }
})
