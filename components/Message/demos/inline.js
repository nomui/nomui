define([], function () {
    return {
      title: '内联消息',
      file: 'inline',
      demo: function () {
        return {
          component: 'Rows',
          items: [
            {
              component: 'Message',
              content: '三秒以后自动消失',
              duration: 3,
              position: null,
            },
            {
              component: 'Message',
              type: 'info',
              content: '信息提示的文案',
              duration: false,
              position: null,
              showClose: true,
            },
            {
              component: 'Message',
              type: 'success',
              content: '成功提示的文案',
              duration: false,
              position: null,
            },
            {
              component: 'Message',
              type: 'error',
              content: '错误提示的文案',
              duration: false,
              position: null,
            },
            {
              component: 'Message',
              type: 'warning',
              content: '警告提示的文案',
              duration: false,
              position: null,
            },
          ],
        }
      },
    }
  })
  