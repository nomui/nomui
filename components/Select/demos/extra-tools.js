define([], function () {
  return {
    title: '额外工具栏',
    file: 'extra-tools',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'small',
        rows: [
          {
            component: 'Select',
            value: 1,
            optionFields: { text: 'name', value: 'value' },
            onClear: (args) => {
              console.log(args)
            },
            extraTools: ({ inst, popup }) => {
              return {
                component: 'Button',
                size: 'small',
                type: 'link',
                icon: 'plus',
                text: '新建关联',
                onClick: () => {
                  // do something
                  console.log(inst.props)
                  popup.hide()
                },
              }
            },
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
        ],
      }
    },
  }
})
