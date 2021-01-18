define(
  [
    './basic.js',
    './value.js',
    './validation.js',
    './inline.js',
    './field-span.js',
    './label-align.js',
    './striped.js',
    './splitline.js',
    './outline.js',
    './styles.js',
    './complex-control.js'
  ],
  function () {
    return {
      title: 'Form',
      subtitle: '表单',
      demos: Array.prototype.slice.call(arguments),
    }
  }
)
