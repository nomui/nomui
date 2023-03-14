define([], function () {
  return {
    title: '配置单个按钮属性',
    file: 'defaults',
    demo: function () {
      return {
        component: 'Toolbar',
        visibleItems: 3,
        itemDefaults: {
          shape: 'round',
        },
        items: [
          {
            text: '圆形',
            onClick: () => {
              console.log('按钮1')
            },
          },
          {
            text: '按钮2',
            onClick: () => {
              console.log('按钮2')
            },
          },
          {
            text: '按钮3',
            onClick: () => {
              console.log('按钮3')
            },
          },
          {
            text: '按钮4',
            onClick: () => {
              console.log('按钮4')
            },
          },
          {
            text: '按钮5',
            onClick: () => {
              console.log('按钮5')
            },
          },
        ],
      }
    },
  }
})
