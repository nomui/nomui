define([], function () {
  return {
    title: '字段值',
    file: 'value',
    demo: function () {
      let field = null

      return {
        component: 'Flex',
        gap: 'small',
        rows: [
          {
            component: 'Textbox',
            label: '姓名',
            ref: (c) => {
              field = c
            },
            labelAlign: 'left',
            value: 'Jerry',
          },
          {
            component: 'Flex',
            gap: 'small',
            attrs: {
              style: {
                minHeight: '40px',
              },
            },
            cols: [
              {
                component: 'Button',
                text: 'set value to Tom',
                onClick: () => {
                  field.setValue('Tom')
                },
              },
              {
                component: 'Button',
                text: 'reset',
                onClick: () => {
                  field.reset('Tom')
                },
              },
              {
                component: 'Button',
                text: 'clear',
                onClick: () => {
                  field.clear('Tom')
                },
              },
            ],
          },
        ],
      }
    },
  }
})
