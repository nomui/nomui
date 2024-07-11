define([], function () {
  return {
    title: '控制尺寸',
    file: 'size',
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
                  size: 'xsmall',
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
          {
            component: 'Button',
            name: 'button',
            text: '另一种',
            attrs: {
              onclick: function () {
                new nomui.Modal({
                  size: {
                    width: 1000,
                  },
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
          {
            component: 'Button',
            name: 'button',
            text: '全屏模态框',
            attrs: {
              onclick: function () {
                new nomui.Modal({
                  size: 'full',
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
