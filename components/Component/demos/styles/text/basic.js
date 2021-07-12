define([], function () {
  return {
    title: '文本颜色',
    file: 'color',
    description: '通过 `styles.text` 来设置文本的样式。',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'small',
        rows: [
          {
            tag: 'div',
            styles: {
              text: ['center', 'red', 'lg'],
            },
            children: '我是一段居中显示的红色大文本',
          },
        ],
      }
    },
  }
})
