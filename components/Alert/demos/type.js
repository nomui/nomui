define([], function () {
  return {
    title: '不同类型',
    file: 'type',
    demo: function () {
      return {
        component: 'Cols',
        items: [
          {
            component: 'Button',
            text: 'info',
            attrs: {
              onclick: function () {
                new nomui.Alert({
                  type: 'info',
                  title: '我是提示信息标题',
                  description: '我是提示信息描述',
                })
              },
            },
          },
          {
            component: 'Button',
            text: 'success',
            attrs: {
              onclick: function () {
                new nomui.Alert({
                  type: 'success',
                  title: '我是成功信息标题',
                  description: '我是成功信息描述',
                })
              },
            },
          },
          {
            component: 'Button',
            text: 'error',
            attrs: {
              onclick: function () {
                new nomui.Alert({
                  type: 'error',
                  title: '我是错误信息标题',
                  description: '我是错误信息描述',
                })
              },
            },
          },
          {
            component: 'Button',
            text: 'warning',
            attrs: {
              onclick: function () {
                new nomui.Alert({
                  type: 'warning',
                  title: '我是警告信息标题',
                  description: '我是警告信息描述',
                })
              },
            },
          },
        ],
      }
    },
  }
})
