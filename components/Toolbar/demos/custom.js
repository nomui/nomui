define([], function () {
  return {
    title: '自定义按钮',
    file: 'custom',
    demo: function () {
      return {
        component: 'Toolbar',
        visibleItems: 1,
        items: [
          {
            text: '按钮1',
            type: 'primary',
            onClick: () => {
              console.log('按钮1')
            },
          },
          {
            text: '按钮2',
            danger: true,
            onClick: () => {
              console.log('按钮2')
            },
          },
          {
            text: '按钮3',
            disabled: true,
            onClick: () => {
              console.log('按钮3')
            },
          },
          {
            text: '按钮4',
            type: 'primary',
            onClick: () => {
              console.log('按钮4')
            },
          },
          {
            text: '按钮5',
            danger: true,
            onClick: () => {
              console.log('按钮5')
            },
          },
        ],
      }
    },
  }
})
