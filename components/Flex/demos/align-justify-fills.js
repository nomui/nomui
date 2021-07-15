define([], function () {
  return {
    title: '排列与对齐',
    file: 'align-justify-fills',
    description: '`align` 配置对齐方式，`justify` 配置排列方式，`fills` 配置是否按内容占满空间',
    demo: function () {
      let rowsFlexRef = null,
        colsFlexRef = null

      const itemDefaults = {
        styles: {
          color: 'lprimary-light',
          padding: '1',
          border: '1px',
        },
      }

      return {
        component: 'Flex',
        gap: 'large',
        rows: [
          {
            gutter: 'large',
            cols: [
              {
                span: 6,
                children: {
                  ref: (c) => {
                    rowsFlexRef = c
                  },
                  styles: {
                    color: 'lprimary',
                  },
                  attrs: {
                    style: {
                      height: '200px',
                    },
                  },
                  align: 'center',
                  justify: 'center',
                  rows: [
                    {
                      children: 'flex-item',
                    },
                    {
                      children: 'flex-item',
                    },
                    {
                      children: 'flex-item',
                    },
                  ],
                  itemDefaults: itemDefaults,
                },
              },
              {
                span: 6,
                children: {
                  ref: (c) => {
                    colsFlexRef = c
                  },
                  styles: {
                    color: 'lprimary',
                  },
                  attrs: {
                    style: {
                      height: '200px',
                    },
                  },
                  align: 'center',
                  justify: 'center',
                  cols: [
                    {
                      children: 'flex-item',
                    },
                    {
                      children: 'flex-item',
                    },
                    {
                      children: 'flex-item',
                    },
                  ],
                  itemDefaults: itemDefaults,
                },
              },
            ],
          },
          {
            rows: [
              {
                component: 'RadioList',
                label: 'align',
                uistyle: 'button',
                value: 'center',
                options: [
                  { text: 'start', value: 'start' },
                  { text: 'end', value: 'end' },
                  { text: 'center', value: 'center' },
                  { text: 'stretch', value: 'stretch' },
                ],
                onValueChange: ({ newValue }) => {
                  rowsFlexRef.update({
                    align: newValue,
                  })
                  colsFlexRef.update({
                    align: newValue,
                  })
                },
              },
              {
                component: 'RadioList',
                label: 'justify',
                uistyle: 'button',
                value: 'center',
                options: [
                  { text: 'start', value: 'start' },
                  { text: 'end', value: 'end' },
                  { text: 'center', value: 'center' },
                  { text: 'between', value: 'between' },
                  { text: 'around', value: 'around' },
                ],
                onValueChange: ({ newValue }) => {
                  rowsFlexRef.update({
                    justify: newValue,
                  })
                  colsFlexRef.update({
                    justify: newValue,
                  })
                },
              },
              {
                component: 'Checkbox',
                label: '',
                text: 'fills',
                onValueChange: ({ newValue }) => {
                  rowsFlexRef.update({
                    fills: newValue,
                  })
                  colsFlexRef.update({
                    fills: newValue,
                  })
                },
              },
            ],
          },
        ],
      }
    },
  }
})
