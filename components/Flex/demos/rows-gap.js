define([], function () {
  return {
    title: '行间隔',
    file: 'rows-gap',
    demo: function () {
      let flexRef = null
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
                flexRef.update({ gap: newValue })
              },
            },
          },
          {
            children: {
              ref: (c) => {
                flexRef = c
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
            },
          },
        ],
      }
    },
  }
})
