define([], function () {
  return {
    title: '自定义工具条',
    file: 'tools-render',
    demo: function () {
      return {
        children: {
          component: 'Rows',
          items: [
            {
              component: 'Menu',
              itemSelectable: {
                byClick: true,
              },

              attrs: {
                style: {
                  width: '250px',
                },
              },
              items: [
                {
                  text: '起步',
                  id: 'css',
                  url: '#!css!',
                },
                {
                  text: '文字很长的标题看看溢出效果(tools)',
                  id: 'css',
                  toolsRender: (item, menu) => {
                    return {
                      component: 'Cols',
                      gutter: 'xs',
                      items: [
                        {
                          component: 'Button',
                          type: 'text',
                          size: 'xsmall',
                          icon: 'refresh',
                          onClick: () => {
                            console.log(item)
                          },
                        },
                        {
                          component: 'Button',
                          type: 'text',
                          size: 'xsmall',
                          icon: 'refresh',
                          onClick: () => {
                            console.log(menu)
                          },
                        },
                        {
                          component: 'Button',
                          type: 'text',
                          size: 'xsmall',
                          icon: 'refresh',
                          onClick: () => {
                            console.log(menu)
                          },
                        },
                      ],
                    }
                  },
                  items: [
                    { text: '起步', id: 'css', url: '#!css!' },
                    {
                      text: '样式',
                      id: 'css',
                      url: '#!css!',
                      items: [
                        { text: '起步', id: 'css', url: '#!css!' },
                        { text: '样式', id: 'css', url: '#!css!' },
                      ],
                    },
                  ],
                },
                {
                  type: 'divider',
                },
                { text: '组件', id: 'components', url: '#!components!' },
                { text: '单页应用', id: 'javascript', url: '#!components!demo' },
              ],
            },
          ],
        },
      }
    },
  }
})
