define([], function () {
  return {
    title: '菜单排序',
    file: 'sortable',
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
              sortable: {
                onEnd: (args) => {
                  console.log('onEnd', args)
                },
              },
              items: [
                {
                  text: 'CSS入门',
                  id: 'css-start',
                },
                {
                  text: 'CSS核心',
                  id: 'css-core',
                  items: [
                    { text: 'CSS基础', id: 'css-basics' },
                    {
                      text: 'CSS样式设计',
                      id: 'css-styling',
                      items: [
                        { text: 'CSS入门指南', id: 'css-start-guide' },
                        { text: '高级CSS技巧', id: 'css-advanced' },
                      ],
                    },
                  ],
                },
                {
                  type: 'divider',
                },
                {
                  text: '组件开发',
                  id: 'components-dev',
                  items: [
                    { text: '组件基础', id: 'components-basics' },
                    {
                      text: '组件样式',
                      id: 'components-styles',
                      items: [
                        { text: '组件入门', id: 'components-start' },
                        { text: '样式系统', id: 'components-styling-system' },
                      ],
                    },
                  ],
                },
                {
                  text: 'SPA开发',
                  id: 'javascript-spa',
                },
              ],
            },
          ],
        },
      }
    },
  }
})
