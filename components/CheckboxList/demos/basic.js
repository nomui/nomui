define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
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
              },
              {
                text: '梁羽生',
                value: 3,
              },
              {
                text: '温瑞安',
                value: 4,
              },
            ],
          },
        ],
      }
    },
  }
})
