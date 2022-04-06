define([], function () {
  return {
    title: '对象传值的用法',
    file: 'object',
    demo: function () {
      return {
        children: {
          component: 'Steps',
          direction: 'vertical',
          options: [
            {
              title: {
                attrs: {
                  style: {
                    'font-weight': 'bold',
                    'min-width': '450px',
                  },
                },
                children: '这是标题',
              },
              subTitle: {
                attrs: {
                  style: {
                    'margin-left': '50px',
                  },
                },
                tag: 'span',
                children: '2022-01-01 12:00:00',
              },
              status: 'finish',
              description: '',
            },
            {
              title: {
                attrs: {
                  style: {
                    'font-weight': 'bold',
                    'min-width': '450px',
                  },
                },
                children: '这是标题',
              },
              subTitle: {
                attrs: {
                  style: {
                    'margin-left': '50px',
                  },
                },
                tag: 'span',
                children: '2022-01-01 12:00:00',
              },
              status: 'finish',
              description: {
                children: [
                  {
                    attrs: {
                      style: {
                        color: '#969799',
                        'margin-bottom': '12px',
                      },
                    },
                    children: '这是描述信息',
                  },
                  {
                    component: 'Button',
                    attrs: {
                      style: {
                        'margin-bottom': '24px',
                      },
                    },
                    text: 'primary',
                    type: 'primary',
                  },
                ],
              },
            },
            {
              title: {
                attrs: {
                  style: {
                    'font-weight': 'bold',
                    'min-width': '450px',
                  },
                },
                children: '这是标题',
              },
              subTitle: {
                attrs: {
                  style: {
                    'margin-left': '50px',
                  },
                },
                tag: 'span',
                children: '2022-01-01 12:00:00',
              },
              status: 'finish',
              description: {
                children: [
                  {
                    attrs: {
                      style: {
                        color: '#969799',
                        'margin-bottom': '12px',
                      },
                    },
                    children: '这是描述信息',
                  },
                  {
                    component: 'Flex',
                    attrs: {
                      style: {
                        'margin-bottom': '12px',
                      },
                    },
                    gap: 'small',
                    rows: [
                      {
                        children: '信息1',
                      },
                      {
                        children: '信息2',
                      },
                      {
                        children: '信息3',
                      },
                    ],
                  },
                  {
                    component: 'Button',
                    attrs: {
                      style: {
                        'margin-bottom': '24px',
                      },
                    },
                    text: 'primary',
                    type: 'primary',
                  },
                ],
              },
            },
            {
              title: {
                attrs: {
                  style: {
                    'font-weight': 'bold',
                    'min-width': '450px',
                  },
                },
                children: '这是标题',
              },
              subTitle: {
                attrs: {
                  style: {
                    'margin-left': '50px',
                  },
                },
                tag: 'span',
                children: '2022-01-01 12:00:00',
              },
              status: 'finish',
              description: '',
            },
          ],
        },
      }
    },
  }
})
