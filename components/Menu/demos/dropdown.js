define([], function () {
  return {
    title: '下拉菜单',
    file: 'dropdown',
    demo: function () {
      return {
        attrs: {
          style: {
            display: 'flex',
            justifyContent: 'flex-end',
          },
        },
        children: [
          {
            component: 'Menu',
            attrs: {
              style: {
                width: '300px',
              },
            },
            direction: 'vertical',
            dropdown: {
              align: 'left top',
            },
            popupOffset: [15, 0],
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
                    text: '样式样式样式样式样式样式',
                    id: 'css',
                    url: '#!css!',
                    items: [
                      {
                        text: '起步起步起步起步起步起步',
                        id: 'css',
                        url: '#!css!',
                        disabled: true,
                      },
                      { text: '样式样式样式样式样式样式样式', id: 'css', url: '#!css!' },
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
