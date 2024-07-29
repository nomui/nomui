define([], function () {
  return {
    title: '排列与对齐',
    file: 'align-justify-fills',
    description: '`align` 配置对齐方式，`justify` 配置排列方式，`fills` 配置是否按内容占满空间',
    demo: function () {
      let verticalListRef = null,
        listRef = null

      const data = [
        {
          text: 'data-item',
        },
        {
          text: 'data-item',
        },
        {
          text: 'data-item',
        },
      ]

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
                  component: 'DataList',
                  ref: (c) => {
                    listRef = c
                  },
                  styles: {
                    color: 'lprimary',
                  },
                  attrs: {
                    style: {
                      height: '200px',
                    },
                  },
                  data: data,
                  itemRender: ({ itemData }) => {
                    return {
                      styles: {
                        color: 'lprimary-light',
                        padding: '1',
                        border: '1px',
                      },
                      children: itemData.text
                    }
                  }
                },
              },
              {
                span: 6,
                children: {
                  component: 'DataList',
                  ref: (c) => {
                    verticalListRef = c
                  },
                  vertical: true,
                  styles: {
                    color: 'lprimary',
                  },
                  attrs: {
                    style: {
                      height: '200px',
                    },
                  },
                  data: data,
                  itemRender: ({ itemData }) => {
                    return {
                      styles: {
                        color: 'lprimary-light',
                        padding: '1',
                        border: '1px',
                      },
                      children: itemData.text
                    }
                  }
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
                value: false,
                options: [
                  { text: 'start', value: 'start' },
                  { text: 'end', value: 'end' },
                  { text: 'center', value: 'center' },
                  { text: 'stretch', value: 'stretch' },
                  { text: 'none', value: false },
                ],
                onValueChange: ({ newValue }) => {
                  verticalListRef.update({
                    align: newValue,
                  })
                  listRef.update({
                    align: newValue,
                  })
                },
              },
              {
                component: 'RadioList',
                label: 'justify',
                uistyle: 'button',
                value: false,
                options: [
                  { text: 'start', value: 'start' },
                  { text: 'end', value: 'end' },
                  { text: 'center', value: 'center' },
                  { text: 'between', value: 'between' },
                  { text: 'around', value: 'around' },
                  { text: 'none', value: false },
                ],
                onValueChange: ({ newValue }) => {
                  verticalListRef.update({
                    justify: newValue,
                  })
                  listRef.update({
                    justify: newValue,
                  })
                },
              },
              {
                component: 'Checkbox',
                label: '',
                text: 'fills',
                onValueChange: ({ newValue }) => {
                  verticalListRef.update({
                    fills: newValue,
                  })
                  listRef.update({
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
