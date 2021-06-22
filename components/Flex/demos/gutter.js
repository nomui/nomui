define([], function () {
  return {
    title: '槽（填充）',
    file: 'gutter',
    description: '`gutter` 用来配置子项内部的填充大小',
    demo: function () {
      let rowflexRef = null,
        colFlexRef = null

      const itemDefaults = {
        styles: {
          color: 'lprimary-light',
          padding: '1',
        },
      }

      return {
        component: 'Flex',
        gap: 'large',
        rows: [
          {
            gap: 'large',
            cols: [
              {
                component: 'RadioList',
                uistyle: 'button',
                value: false,
                options: [
                  { text: 'default', value: false },
                  { text: 'small', value: 'small' },
                  { text: 'medium', value: 'medium' },
                  { text: 'large', value: 'large' },
                  { text: '1px', value: '1px' },
                  { text: '2px', value: '2px' },
                ],
                onValueChange: ({ newValue }) => {
                  rowflexRef.update({ gutter: newValue })
                  colFlexRef.update({ gutter: newValue })
                },
              },
            ],
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
                        component: 'Button',
                        text: '第一行',
                      },
                      { component: 'Button', text: '第二行' },
                      { component: 'Button', text: '第三行' },
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
                      { component: 'Button', text: '第一列' },
                      { component: 'Button', text: '第二列' },
                      { component: 'Button', text: '第三列' },
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
