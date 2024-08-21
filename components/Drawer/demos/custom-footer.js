define([], function () {
  return {
    title: '自定义底部操作栏',
    file: 'custom-footer',
    demo: function () {
      return {
        children: [
          {
            component: 'Button',
            name: 'button',
            text: '点我',
            attrs: {
              onclick: function () {
                new nomui.Drawer({
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
                          children: 'I am a drawer',
                        },
                      ],
                    },
                    footer: (modal) => {
                      return {
                        children: {
                          component: 'Cols',
                          items: [
                            {
                              component: 'Button',
                              styles: {
                                color: 'primary',
                              },
                              text: '我知道了',
                              onClick: function () {
                                modal.close()
                              },
                            },
                          ],
                        },
                      }
                    },
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
