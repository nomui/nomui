define([], function () {
  return {
    title: '自定义内容',
    file: 'item-render',
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
              itemRender: (data) => {
                if (!data) {
                  return {
                    component: 'Divider',
                  }
                }

                return {
                  component: 'Flex',
                  justify: 'between',
                  attrs: {
                    style: {
                      'flex-grow': 2,
                    },
                  },
                  cols: [
                    {
                      children: data.text,
                      grow: true,
                    },
                    data.count && {
                      component: 'Tag',
                      text: data.count,
                      size: 'xs',
                      styles: {
                        color: 'yellow',
                      },
                      grow: false,
                    },
                  ],
                }
              },
              attrs: {
                style: {
                  width: '250px',
                },
              },
              items: [
                {
                  text: '起步',
                  count: 14,
                  id: 'css',
                  url: '#!css!',
                },
                {
                  text: '基础',
                  id: 'css',

                  items: [
                    { text: '起步', id: 'css' },
                    {
                      text: '样式',
                      id: 'css',
                      url: '#!css!',
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
                { text: '组件', id: 'components', count: 22 },
                { text: '单页应用', id: 'javascript', count: 19 },
              ],
            },
          ],
        },
      }
    },
  }
})
