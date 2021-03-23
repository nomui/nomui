define([
  './basic.js',
  './styles.js',
  './resizable.js',
  './frozen-header.js',
  './colspan.js',
  './auto-merge.js',
  './multiple-header.js',
  './row-checkable.js',
  './row-checkable-events.js',
  './custom-columns.js',
  './tree-grid.js',
], function () {
  return {
    title: 'Grid',
    subtitle: '高级表格',
    demos: Array.prototype.slice.call(arguments),
  }
})
