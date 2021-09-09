define([], function () {
  return {
    title: '紧凑模式',
    file: 'compact',
    demo: function () {
      const items = [
        { text: '起步', id: 'css' },
        {
          text: '样式',
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

        { text: '组件', id: 'components' },
        { text: '单页应用', id: 'javascript' },
      ]

      return {
        component: 'Rows',
        items: [
          {
            component: 'Menu',
            attrs: {
              style: {
                width: '80px',
              },
            },
            direction: 'vertical',
            compact: true,
            itemSelectable: {
              byClick: true,
            },
            items: items,
          },
        ],
      }
    },
  }
})
