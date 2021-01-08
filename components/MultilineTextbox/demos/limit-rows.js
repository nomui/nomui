define([], function () {
  return {
    title: '限制行范围',
    description: '根据内容，高度在 2 行到 6 行内容之间自动调整',
    file: 'limit-rows',
    demo: function () {
      return {
        children: [
          {
            component: 'MultilineTextbox',
            value: '大文本',
            autoSize: { minRows: 2, maxRows: 6 },
          },
        ],
      }
    },
  }
})
