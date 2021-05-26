define([], function () {
  return {
    title: '带分割线',
    file: 'divider',
    demo: function () {
      return {
        children: {
          component: 'Rows',
          items: [
            {
              component: 'Menu',
              direction: 'horizontal',
              items: [
                { text: '起步', id: 'css', url: '#!css!' },

                {
                  text: '样式',
                  id: 'css',
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
                { text: '起步', id: 'css', url: '#!css!' },
                {
                  text: '样式',
                  id: 'css',
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
