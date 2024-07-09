define([
  './basic.js',
  './view.js',
  './async-view.js',
  './long-content.js',
  './custom-footer.js',
  './size.js',
  './fit.js',
  './custom-ok-cancel.js',
  './no-header-or-no-footer.js',
], function () {
  return {
    title: 'Modal',
    subtitle: '模态框',
    demos: Array.prototype.slice.call(arguments),
  }
})
