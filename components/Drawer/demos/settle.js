define([], function () {
  return {
    title: '抽屉方向',
    file: 'settle',
    demo: function () {
      let drawerRef = null
      const buttons = [
        { text: '上', settle: 'top' },
        { text: '右', settle: 'right' },
        { text: '下', settle: 'bottom' },
        { text: '左', settle: 'left' },
      ]
      return {
        component: 'Container',
        children: [
          {
            component: 'Cols',
            justify: 'center',
            items: buttons.map(({ text, settle }) => ({
              component: 'Button',
              type: 'primary',
              text,
              onClick: () => {
                drawerRef.update({ visible: true, settle, title: `${text}边弹出` })
              },
            })),
          },
          {
            component: 'Drawer',
            ref: (c) => {
              drawerRef = c
            },
            width: '50%',
            height: '50%',
            onOk: (args) => {
              // do some other
              // 手动关闭
              args.sender.close()
            },
          },
        ],
      }
    },
  }
})
