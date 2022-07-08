define([], function () {
  return {
    title: '隐藏，显示某个选项',
    file: 'show-hide-option',
    demo: function () {
      let checkboxListRef = null

      return {
        component: 'Flex',
        gap: 'small',
        rows: [
          {
            component: 'Flex',
            gap: 'small',
            cols: [
              {
                component: 'Button',
                text: '隐藏选项：梁羽生',
                onClick: () => {
                  checkboxListRef.hideOption(3)
                },
              },
              {
                component: 'Button',
                text: '显示选项：梁羽生',
                onClick: () => {
                  checkboxListRef.showOption(3)
                },
              },
            ],
          },
          {
            component: 'CheckboxList',
            ref: (c) => {
              checkboxListRef = c
            },
            options: [
              {
                text: '金庸',
                value: 1,
              },
              {
                text: '古龙',
                value: 2,
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
