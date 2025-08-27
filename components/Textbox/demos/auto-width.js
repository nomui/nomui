define([], function () {
  return {
    title: '自适应宽度',
    file: 'auto-width',
    demo: function () {
      return {
        children: {
          component: 'Textbox',
          placeholder: 'basic usage',
          autoWidth: { minWidth: 120 },
        },
      }
    },
  }
})
