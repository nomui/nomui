define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'small',
        rows: [
          {
            component: 'Select',
            value: 1,
            optionFields: { text: 'name', value: 'value' },
            options: [
              {
                name: '金庸',
                value: 0,
              },
              {
                name: '古龙',
                value: 1,
              },
              {
                name: '梁羽生',
                value: 2,
              },
              {
                name: '温瑞安',
                value: 3,
              },
            ],
          },
          {
            component: 'Select',
            placeholder: '选择你喜欢的作者',
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
          },
        ],
      }
    },
  }
})
