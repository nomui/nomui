define([], function () {
  return {
    title: '禁用状态',
    file: 'disabled',
    demo: function () {
      let checkboxListRef = null
      return {
        component: 'Rows',
        items: [
          {
            component: 'Button',
            text: 'test',
            onClick: () => {
              checkboxListRef.setValue([0, 1])
            },
          },
          {
            component: 'CheckboxList',
            ref: (c) => {
              checkboxListRef = c
            },
            disabled: false,
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
