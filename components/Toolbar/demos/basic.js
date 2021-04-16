define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'Toolbar',
        visibleItems: 3,
        items: [
          {
            text: '按钮1',
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
