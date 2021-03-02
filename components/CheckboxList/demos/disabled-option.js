define([], function () {
  return {
    title: '禁用选项',
    file: 'disabled-option',
    demo: function () {
      return {
        children: [
          {
            component: 'CheckboxList',
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
                value: 3,
              },
              {
                text: '温瑞安',
                value: 4,
                disabled: true,
              },
            ],
          },
        ],
      }
    },
  }
})
