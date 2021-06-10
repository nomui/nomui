define([], function () {
  return {
    title: '界面风格',
    file: 'uistyle',
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
            direction: 'horizontal',
            itemSelectable: {
              byClick: true,
            },
            uistyle: 'pill',
            items: items,
          },
          {
            component: 'Menu',
            itemSelectable: {
              byClick: true,
            },
            uistyle: 'pill',
            items: items,
          },
        ],
      }
    },
  }
})
