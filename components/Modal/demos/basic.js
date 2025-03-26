define([], function () {
  return {
    title: '基本用法',
    file: 'basic',
    description:
      '通过 `content` 配置模态框的内容，当配置值为 `object` 时，默认会混入 `Panel` 的配置，该 `Panel` 的 `footer` 部分配置了确定和取消按钮。',
    demo: function () {
      return {
        children: {
          component: 'Button',
          name: 'button',
          text: '点我打开模态框',
          onClick: () => {
            new nomui.Modal({
              content: {
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
              onOk: ({ sender }) => {
                new nomui.Message({ type: 'info', content: '点击了确定按钮' })
                sender.close()
              },
              onClose: () => {
                new nomui.Message({ type: 'info', content: '点击了关闭按钮' })
              },
            })
          },
        },
      }
    },
  }
})
