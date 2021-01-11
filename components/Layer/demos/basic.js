define([], function () {
  return {
    title: '基本用法',
    file: 'basic',
    demo: function () {
      let layer = null

      return {
        children: [
          {
            component: 'Button',
            text: '隐藏',
            attrs: {
              onclick: function () {
                layer.hide()
              },
            },
          },
          {
            component: 'Button',
            text: '显示',
            attrs: {
              onclick: function () {
                layer.show()
              },
            },
          },
          {
            component: 'Layer',
            ref: (c) => {
              layer = c
            },
            children:
              '我是层内容，只有显示、隐藏的行为，不定位，不设置大小，不额外设置内容，且已经在dom中。',
          },
        ],
      }
    },
  }
})
