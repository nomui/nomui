define([], function () {
  return {
    title: '按钮样式',
    file: 'type-button',
    demo: function () {
      return {
        children: [
          {
            component: 'RadioList',
            options: [
              {
                text: '金庸',
                value: 0,
              },
              {
                text: '古龙',
                value: 1,
              },
              {
                text: '梁羽生',
                value: 2,
              },
              {
                text: '温瑞安',
                value: 3,
              },
            ],
            uistyle: 'button',
          },
        ],
      }
    },
  }
})
