define([], function () {
  return {
    title: '排列与对齐',
    file: 'align-justify-fills',
    description: '`align` 配置对齐方式，`justify` 配置排列方式，`fills` 配置是否按内容占满空间',
    demo: function () {
      let flexRef = null,
        verticalFlexRef = null

      const itemStyles = {
        color: 'lprimary-light',
        padding: '1',
        border: '1px',
      }

      return {
        component: 'Flex',
        vertical: true,
        items: [
          {
            component: 'Flex',
            cols: 2,
            items: [
              {
                component: 'Flex',
                ref: (c) => {
                  flexRef = c
                },
                styles: {
                  color: 'lprimary',
                  margin: '1',
                },
                attrs: {
                  style: {
                    height: '200px',
                  },
                },
                items: [
                  {
                    children: 'flex-item',
                    styles: itemStyles,
                  },
                  {
                    children: 'flex-item',
                    styles: itemStyles,
                  },
                  {
                    children: 'flex-item',
                    styles: itemStyles,
                  },
                ]
              },
              {
                component: 'Flex',
                ref: (c) => {
                  verticalFlexRef = c
                },
                vertical: true,
                styles: {
                  color: 'lprimary',
                  margin: '1',
                },
                attrs: {
                  style: {
                    height: '200px',
                  },
                },
                items: [
                  {
                    children: 'flex-item',
                    styles: itemStyles,
                  },
                  {
                    children: 'flex-item',
                    styles: itemStyles,
                  },
                  {
                    children: 'flex-item',
                    styles: itemStyles,
                  },
                ]
              }
            ]
          },
          {
            component: 'Flex',
            vertical: true,
            items: [
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
                  flexRef.update({
                    align: newValue,
                  })
                  verticalFlexRef.update({
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
                  flexRef.update({
                    justify: newValue,
                  })
                  verticalFlexRef.update({
                    justify: newValue,
                  })
                },
              },
              {
                component: 'Checkbox',
                label: '',
                text: 'fills',
                onValueChange: ({ newValue }) => {
                  flexRef.update({
                    fills: newValue,
                  })
                  flexRef.update({
                    fills: newValue,
                  })
                },
              },
            ]
          }
        ]
      }
    }
  }
})
