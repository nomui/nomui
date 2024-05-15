define([], function () {
  return {
    title: '界面风格',
    file: 'uistyle',
    demo: function () {
      let hMenuRef, vMenuRef

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
        component: 'Flex',
        rows: [
          {
            component: 'RadioList',
            uistyle: 'button',
            value: 'plain',
            options: [
              {
                text: 'default',
                value: null,
              },
              {
                text: 'highlight-text',
                value: 'highlight-text',
              },
              {
                text: 'pill',
                value: 'pill',
              },
              {
                text: 'line',
                value: 'line',
              },
              {
                text: 'short-line',
                value: 'short-line',
              },
            ],
            onValueChange: function (e) {
              hMenuRef.update({ uistyle: e.newValue })
              vMenuRef.update({ uistyle: e.newValue })
            },
          },
          {
            component: 'Menu',
            ref: (c) => {
              hMenuRef = c
            },
            direction: 'horizontal',
            itemSelectable: {
              byClick: true,
            },
            items: items,
          },
          {
            component: 'Menu',
            ref: (c) => {
              vMenuRef = c
            },
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
