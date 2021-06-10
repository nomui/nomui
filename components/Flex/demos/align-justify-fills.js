define([], function () {
  return {
    title: '排列与对齐',
    file: 'align-justify-fills',
    demo: function () {
      let flexRef = null

      return {
        component: 'Flex',
        rows: [
          {
            children: {
              component: 'Flex',
              ref: (c) => {
                flexRef = c
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
              itemDefaults: {
                styles: {
                  color: 'lprimary-light',
                  padding: '1',
                  border: '1px',
                },
              },
            },
          },
          {
            children: {
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
                    flexRef.update({
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
                    flexRef.update({
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
                  },
                },
              ],
            },
          },
        ],
      }
    },
  }
})
