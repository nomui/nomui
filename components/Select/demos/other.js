define([], function () {
  return {
    title: '其他',
    file: 'other',
    demo: function () {
      let formRef = null
      return {
        component: 'Flex',
        gap: 'small',
        rows: [
          {
            component: 'Form',
            ref: (c) => {
              formRef = c
            },
            fields: [
              {
                component: 'Select',
                name: 'author',
                value: 3,
                span: 6,
                options: [
                  {
                    text: '金庸',
                    value: 0,
                  },
                  {
                    text: '古龙',
                    value: 1,
                  },
                  {
                    text: '梁羽生',
                    value: 2,
                  },
                  {
                    text: '温瑞安',
                    value: 3,
                  },
                ],
              },
              {
                component: 'Select',
                name: 'copy',
                value: 3,
                span: 6,
                options: [
                  {
                    text: '金庸',
                    value: 0,
                  },
                  {
                    text: '古龙',
                    value: 1,
                  },
                  {
                    text: '梁羽生',
                    value: 2,
                  },
                  {
                    text: '温瑞安',
                    value: 3,
                  },
                ],
              },
            ],
          },
          {
            component: 'Cols',
            items: [
              {
                component: 'Button',
                text: 'GET',
                onClick: () => {
                  const value = formRef.getValue()
                  new nomui.Message({ type: 'info', content: JSON.stringify(value) })
                },
              },
              {
                component: 'Button',
                text: 'SET',
                onClick: () => {
                  const values = formRef.getValue()
                  const author = values.copy
                  formRef.setValue({ ...values, author })
                },
              },
              {
                component: 'Button',
                text: 'Reset',
                onClick: () => {
                  formRef.reset()
                },
              },
              {
                component: 'Button',
                text: 'Clear',
                onClick: () => {
                  console.log('clear')
                  formRef.clear()
                },
              },
            ],
          },
        ],
      }
    },
  }
})
