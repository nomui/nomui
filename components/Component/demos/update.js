define([], function () {
  return {
    title: '更新组件',
    file: 'update',
    description: '通过调用组件的 `update` 方法，传入需要要更新的 props，可以更新组件',
    demo: function () {
      let componentRef = null
      return {
        component: 'Flex',
        rows: [
          {
            ref: (c) => {
              componentRef = c
            },
            tag: 'p',
            attrs: {
              id: 'AnPara',
              style: {
                padding: '5px',
                border: '1px solid blue',
              },
              onclick: () => {
                // eslint-disable-next-line no-alert
                alert('hello nomui')
              },
            },
            children: '一段文本',
          },
          {
            component: 'Form',
            fields: [
              {
                component: 'Checkbox',
                label: '边框',
                value: true,
                onValueChange: ({ newValue }) => {
                  componentRef.update({
                    attrs: {
                      style: {
                        border: newValue ? '1px solid blue' : false,
                      },
                    },
                  })
                },
              },
              {
                component: 'RadioList',
                label: '内边距',
                uistyle: 'button',
                value: '5px',
                options: [
                  { text: '5px', value: '5px' },
                  { text: '15px', value: '15px' },
                  { text: '25px', value: '25px' },
                ],
                onValueChange: ({ newValue }) => {
                  componentRef.update({
                    attrs: {
                      style: {
                        padding: newValue,
                      },
                    },
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
