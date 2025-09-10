define([
  './basic.js',
  './nest.js',
  './dependencies.js',
  './field-uistyle.js',
  './get-field.js',
  './value.js',
  './options-value-as-array.js',
  './set-value-ignore-none.js',
  './validate.js',
  './nowrap.js',
  './inline.js',
  './span.js',
  './striped.js',
  './splitline.js',
  './outline.js',
  './styles.js',
  './uistyle.js',
  './read-mode.js',
], function () {
  return {
    title: 'Group',
    subtitle: '字段组',
    demos: Array.prototype.slice.call(arguments),
  }
})
