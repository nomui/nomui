define([], function () {
  return {
    title: '控制尺寸',
    file: 'size',
    description: '组件预设了xsmall small medium large xlarge full几个尺寸，可以通过字符串形式配置给size，也可以直接传数值配置高宽',
    demo: function () {
      return {
        children: {
          component: 'Flex',
          gutter: 'small',
          cols: [
            {
              component: 'Button',
              name: 'button',
              text: '预设尺寸',
              attrs: {
                onclick: function () {
                  new nomui.Drawer({
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
              text: '预设尺寸(垂直)',
              attrs: {
                onclick: function () {
                  new nomui.Drawer({
                    size: 'large',
                    settle: 'top',
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
              text: '直接传值',
              attrs: {
                onclick: function () {
                  new nomui.Drawer({
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
              text: '直接传值(垂直)',
              attrs: {
                onclick: function () {
                  new nomui.Drawer({
                    settle: 'bottom',
                    size: {
                      height: 320,
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
              text: '全屏抽屉',
              attrs: {
                onclick: function () {
                  new nomui.Drawer({
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
      }
    },
  }
})
