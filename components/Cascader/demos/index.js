define([
  './basic.js',
  './leafonly.js',
  './multiple.js',
  './search.js',
  './cascade.js',
  './value.js',
  './field.js',
  './partial.js',
  './disabled.js',
  './remote.js',
], function () {
  return {
    title: 'Cascader',
    subtitle: '级联选择',
    demos: Array.from(arguments),
  }
})
