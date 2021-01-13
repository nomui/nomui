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
                    footer: {
                      _config: function () {
                        const modal = this.$modal

                        this.setProps({
                          children: {
                            component: 'Button',
                            text: '关闭',
                            onClick: function () {
                              modal.close()
                            },
                          },
                        })
                      },
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
