define([], function () {
  return {
    title: '图标',
    file: 'icon',
    demo: function () {
      return {
        component: 'Toolbar',
        items: [
          {
            text: '按钮1',
            icon: 'info-circle',
            onClick: () => {
              console.log('按钮1')
            },
          },
          {
            text: '按钮2',
            icon: 'pin',
            onClick: () => {
              console.log('按钮2')
            },
          },
          {
            text: '按钮3',
            icon: 'form',
            onClick: () => {
              console.log('按钮3')
            },
          },
          {
            text: '按钮4',
            icon: 'clock',
            onClick: () => {
              console.log('按钮4')
            },
          },
          {
            text: '按钮5',
            icon: 'delete',
            onClick: () => {
              console.log('按钮5')
            },
          },
        ],
      }
    },
  }
})
