define([], function () {
  return {
    title: '抽屉方向',
    file: 'settle',
    demo: function () {
      const buttons = [
        { text: '上', settle: 'top' },
        { text: '右', settle: 'right' },
        { text: '下', settle: 'bottom' },
        { text: '左', settle: 'left' },
      ]
      return {
        // component: 'Container',
        component: 'Flex',
        justify: 'center',
        cols: [
          {
            component: 'Cols',
            justify: 'center',
            items: buttons.map(({ text, settle }) => ({
              component: 'Button',
              type: 'primary',
              text,
              onClick: () => {
                new nomui.Drawer({ settle, title: `${text}边弹出` })
              },
            })),
          },
        ],
      }
    },
    description:
      '利用settle的属性来改变抽屉展开的方向',
  }
})
