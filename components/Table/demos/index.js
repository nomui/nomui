define([
  './basic.js',
  './empty.js',
  './styles.js',
  './with-pager.js',
  './append-row.js',
], function () {
  return {
    title: 'Table',
    subtitle: '表格',
    demos: Array.prototype.slice.call(arguments),
  }
})
