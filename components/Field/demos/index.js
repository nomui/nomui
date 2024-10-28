define(
  [
    './basic.js',
    './label-align.js',
    './value.js',
    './extra.js',
    './control-width.js',
    './label-width.js',
    './label-actions.js',
    './label-expandable.js',
    './label-uistyle.js',
  ],
  function () {

    return {
      title: 'Field',
      subtitle: '字段',
      demos: Array.prototype.slice.call(arguments),
    }

  })
