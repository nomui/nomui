define([], function () {
  return {
    title: '间隔',
    file: 'gap',
    description: '`gap` 用来配置子项之间的间距大小',
    demo: function () {
      let rowflexRef = null,
        colFlexRef = null

      const itemStyles = {
        color: 'lprimary-light',
        border: '1px',
        padding: '1',
      }

      return {
        component: 'Flex',
        vertical: true,
        gap: 'large',
        items: [
          {
            children: {
              component: 'RadioList',
              uistyle: 'button',
              value: false,
              options: [
                { text: 'default', value: false },
                { text: 'xsmall', value: 'xsmall' },
                { text: 'small', value: 'small' },
                { text: 'medium', value: 'medium' },
                { text: 'large', value: 'large' },
                { text: 'xlarge', value: 'xlarge' },
              ],
              onValueChange: ({ newValue }) => {
                rowflexRef.update({ gap: newValue })
                colFlexRef.update({ gap: newValue })
              },
            },
          },
          {
            gap: 'medium',
            cols: [
              {
                component: 'Panel',
                uistyle: 'bordered',
                header: false,
                body: {
                  children: {
                    component: 'Flex',
                    ref: (c) => {
                      rowflexRef = c
                    },
                    items: [
                      {
                        children: 'item 1',
                        styles: itemStyles,
                      },
                      {
                        children: 'item 2',
                        styles: itemStyles,
                      },
                      {
                        children: 'item 3',
                        styles: itemStyles,
                      },
                    ],
                  },
                },
              },
              {
                component: 'Panel',
                uistyle: 'bordered',
                fit: true,
                header: false,
                body: {
                  children: {
                    component: 'Flex',
                    ref: (c) => {
                      colFlexRef = c
                    },
                    items: [
                      {
                        children: '第一列',
                        styles: itemStyles,
                      },
                      {
                        children: '第二列',
                        styles: itemStyles,
                      },
                      {
                        children: '第三列',
                        styles: itemStyles,
                      },
                    ],
                  },
                },
              },
            ],
          },
        ],
      }
    },
  }
})
