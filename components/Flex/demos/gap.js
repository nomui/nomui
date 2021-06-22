define([], function () {
  return {
    title: '间隔',
    file: 'gap',
    demo: function () {
      let rowflexRef = null,
        colFlexRef = null

      const itemDefaults = {
        styles: {
          color: 'lprimary-light',
          border: '1px',
          padding: '1',
        },
      }

      return {
        component: 'Flex',
        gap: 'large',
        rows: [
          {
            children: {
              component: 'RadioList',
              uistyle: 'button',
              value: false,
              options: [
                { text: 'default', value: false },
                { text: 'small', value: 'small' },
                { text: 'medium', value: 'medium' },
                { text: 'large', value: 'large' },
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
                    rows: [
                      {
                        children: '第一行',
                      },
                      {
                        children: '第二行',
                      },
                      {
                        children: '第三行',
                      },
                    ],
                    itemDefaults: itemDefaults,
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
                    cols: [
                      {
                        children: '第一列',
                      },
                      {
                        children: '第二列',
                      },
                      {
                        children: '第三列',
                      },
                    ],
                    itemDefaults: itemDefaults,
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
