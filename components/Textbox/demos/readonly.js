define([], function () {
  return {
    title: '只读状态',
    file: 'readonly',
    demo: function () {
      return {
        children: {
          component: 'Textbox',
          placeholder: 'basic usage',
          readonly: true,
          value: '只读',
        },
      }
    },
    description:
      '当readonly为true时,文本框为只读状态',
  }
})
