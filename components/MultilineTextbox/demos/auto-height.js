define([], function () {
  return {
    title: '自动高度',
    description: '高度根据内容自动撑开',
    file: 'auto-height',
    demo: function () {
      return {
        children: [
          {
            component: 'MultilineTextbox',
            value: '大文本\n大文本\n大文本\n大文本\n大文本\n大文本\n大文本\n',
            autoSize: true,
          },
        ],
      }
    },
  }
})
