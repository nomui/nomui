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
          {
            component: 'Button',
            name: 'button',
            text: '另一种',
            attrs: {
              onclick: function () {
                new nomui.Modal({
                  content: '/components/Modal/demos/view-content.js',
                  args: {
                    name: '天龙八部',
                    description:
                      '《天龙八部》以宋哲宗时代为背景，通过宋、辽、大理、西夏、吐蕃等王国之间的武林恩怨和民族矛盾，从哲学的高度对人生和社会进行审视和描写，展示了一幅波澜壮阔的生活画卷。其故事之离奇曲折、涉及人物之众多、历史背景之广泛、武侠战役之庞大、想象力之丰富当属“金书”之最。作品风格宏伟悲壮，是一部写尽人性、悲剧色彩浓厚的史诗巨著。',
                  },
                  footerRender: (modal) => {
                    return {
                      children: {
                        component: 'Cols',
                        items: [
                          {
                            component: 'Button',

                            text: 'Close',
                            onClick: function () {
                              modal.close()
                            },
                          },
                        ],
                      },
                    }
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
