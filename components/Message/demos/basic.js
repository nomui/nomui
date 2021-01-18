define([], function () {
  return {
    title: '基本用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'Cols',
        items: [
          {
            component: 'Button',
            text: 'info',
            onClick: () => {
              new nomui.Message({
                content: '这是一条普通提示消息',
                type: 'info'
              })
            }
          }
        ],
      }
    },
  }
})
