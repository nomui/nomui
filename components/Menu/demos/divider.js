define([], function () {
  return {
    title: '带分割线',
    file: 'divider',
    demo: function () {
      return {
        children: {
          component: 'Flex',
          rows: [
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
                  // url: '#!css!',
                },
                {
                  text: 'css',
                  id: 'css',

                  items: [
                    { text: '起步', id: 'css' },
                    {
                      text: '样式',
                      id: 'css',

                      items: [
                        { text: '起步', id: 'css' },
                        { text: '样式', id: 'css' },
                      ],
                    },
                  ],
                },
                {
                  type: 'divider',
                },
                {
                  text: '组件',
                  id: 'components',

                  items: [
                    { text: '起步', id: 'css' },
                    {
                      text: '样式',
                      id: 'css',

                      items: [
                        { text: '起步', id: 'css' },
                        { text: '样式', id: 'css' },
                      ],
                    },
                  ],
                },
                { text: '单页应用', id: 'javascript', url: '#!components!demo' },
              ],
            },
          ],
        },
      }
    },
  }
})
