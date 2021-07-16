define([], function () {
  return {
    title: '对齐',
    file: 'align',
    description:
      '通过 `styles.text` 设置为 `left`，`center`，`right` 来实现文本的靠左，居中，靠右对齐。',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'small',
        rows: [
          {
            tag: 'p',
            styles: {
              text: 'left',
            },
            children: '我是一段靠左对齐的文本',
          },
          {
            tag: 'p',
            styles: {
              text: 'center',
            },
            children: '我是一段居中对齐的文本',
          },
          {
            tag: 'p',
            styles: {
              text: 'right',
            },
            children: '我是一段靠右对齐的文本',
          },
        ],
      }
    },
  }
})
