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
                          component: 'Select',
                          options: [
                            {
                              text: '金庸',
                              value: 0,
                            },
                            {
                              text: '古龙',
                              value: 1,
                            },
                            {
                              text: '梁羽生',
                              value: 2,
                            },
                            {
                              text: '温瑞安',
                              value: 3,
                            },
                            {
                              text: '金庸',
                              value: 4,
                            },
                            {
                              text: '古龙',
                              value: 5,
                            },
                            {
                              text: '梁羽生',
                              value: 6,
                            },
                            {
                              text: '温瑞安',
                              value: 7,
                            },
                          ],
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
