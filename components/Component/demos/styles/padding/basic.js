define(['css!./padding'], function () {
  return {
    title: '基本用法',
    file: 'basic',
    description: '通过 `styles.padding` 来设置边框的样式。',
    demo: function () {
      return {
        tag: 'div',
        styles: {
          padding: 1,
        },
        classes: { 'padding-demo': true },
        children: {
          children: 'styles.padding: 1',
        },
      }
    },
  }
})
