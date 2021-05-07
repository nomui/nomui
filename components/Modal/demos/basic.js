define([], function () {
  return {
    title: '点击弹出',
    file: 'basic',
    demo: function () {
      return {
        children: [
          {
            component: 'Button',
            name: 'button',
            text: '点我',
            attrs: {
              onclick: function () {
                new nomui.Modal({
                  content: {
                    component: 'Panel',
                    header: {
                      caption: {
                        title: 'hello',
                      },
                    },
                    body: {
                      children: [
                        {
                          children: 'I am a modal',
                        },
                      ],
                    },
                  },
                  onOk: (args) => {
                    new nomui.Message({ type: 'info', content: '点击了确定按钮' })
                    args.sender.close()
                  },
                })
              },
            },
          },
        ],
      }
    },
  }
})
