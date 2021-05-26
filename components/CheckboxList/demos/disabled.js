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
            component: 'RadioList',
            uistyle: 'button',
            options: [
              {
                text: '禁用',
                value: true,
              },
              {
                text: '启用',
                value: false,
              },
            ],
            value: true,
            onValueChange: (args) => {
              if (args.newValue === true) {
                checkboxListRef.disable()
              } else {
                checkboxListRef.enable()
              }
            },
          },
          {
            component: 'CheckboxList',
            ref: (c) => {
              checkboxListRef = c
            },
            disabled: true,
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
