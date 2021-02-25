define([], function () {
  return {
    title: '禁用选项',
    file: 'disabled-option',
    demo: function () {
      return {
        component: 'Rows',
        items: [
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
                disabled: true,
              },
              {
                text: '梁羽生',
                value: 2,
              },
              {
                text: '温瑞安',
                value: 3,
                disabled: true,
              },
            ],
          },
          {
            component: 'RadioList',
            uistyle: 'button',
            options: [
              {
                text: '金庸',
                value: 0,
              },
              {
                text: '古龙',
                value: 1,
                disabled: true,
              },
              {
                text: '梁羽生',
                value: 2,
              },
              {
                text: '温瑞安',
                value: 3,
                disabled: true,
              },
            ],
          },
        ],
      }
    },
  }
})
