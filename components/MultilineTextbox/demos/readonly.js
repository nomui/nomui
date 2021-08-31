define([], function () {
  return {
    title: '只读状态',
    description: '设置 `readonly` 为 true',
    file: 'readonly',
    demo: function () {
      return {
        component: 'MultilineTextbox',
        value: '大文本\n大文本\n大文本\n大文本\n大文本\n大文本\n大文本\n',
        readonly: true,
      }
    },
  }
})
