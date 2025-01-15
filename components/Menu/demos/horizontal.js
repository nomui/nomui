define([], function () {
  return {
    title: '水平菜单',
    file: 'horizontal',
    demo: function () {
      return {
        children: [
          {
            component: 'Menu',
            direction: 'horizontal',
            itemSelectable: {
              byClick: true,
            },
            keyField: 'id',
            sortable: {
              onEnd: (args) => {
                console.log(args)
              },
            },
            items: [
              { text: '起步', id: 'start' },
              {
                text: '样式',
                id: 'css',
                items: [
                  { text: '起步', id: 'css' },
                  {
                    text: '样式',
                    id: 'css',
                    url: '#!css!',
                    items: [
                      { text: '起步', id: 'css', url: '#!css!', disabled: true },
                      { text: '样式', id: 'css', url: '#!css!' },
                    ],
                  },
                ],
              },

              { text: '组件', id: 'components', url: '#!components!' },
              {
                text: '单页应用(新窗口打开)',
                target: 'blank',
                id: 'javascript',
                url: '#!components!demo',
              },
            ],
          },
        ],
      }
    },
  }
})
