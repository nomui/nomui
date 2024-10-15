define([], function () {
  return {
    title: '高度自适应窗口',
    file: 'long-content',
    description:
      '设置 `fit` 为 `true` 时，且内容为 Panel 时，模态框高度会自适应窗口，同时内容（body）高度超过窗口时会出现滚动条',
    demo: function () {
      return {
        children: [
          {
            component: 'Button',
            name: 'button',
            text: '默认撑满一屏高',
            attrs: {
              onclick: function () {
                new nomui.Modal({
                  fit: true,
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
                          children: `Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

                            Pr ullamcorper nulla non metus auctor fringilla.`,
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
            text: '只有内容超出时一屏时才出现滚动条',
            attrs: {
              onclick: function () {
                new nomui.Modal({
                  adaptToFit: true,
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
                          children: `Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

                            Pr ullamcorper nulla non metus auctor fringilla.`,
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
