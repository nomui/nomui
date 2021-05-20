define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      let formRef = null
      let sliderRef = null
      const VALID_NUMBER = /^([0-9]{1,2}|100)$/
      return {
        component: 'Rows',
        items: [
          {
            component: 'Form',
            ref: (c) => {
              formRef = c
            },
            fields: [
              {
                component: 'Slider',
                ref: (c) => {
                  sliderRef = c
                },
                span: 8,
                name: 'slider',
                value: 15,
                onValueChange: ({ newValue }) => {
                  formRef.setValue({ text: newValue, slider: newValue })
                },
              },
              {
                component: 'Numberbox',
                span: 4,
                min: 0,
                max: 100,
                name: 'text',
                value: 15,
                onValueChange: (changed) => {
                  const { newValue } = changed
                  const _newValue = newValue === null ? 0 : newValue
                  if (VALID_NUMBER.test(newValue)) {
                    formRef.setValue({ text: _newValue, slider: _newValue })
                  }
                },
              },
            ],
          },
          {
            component: 'Cols',
            items: [
              {
                component: 'Button',
                text: 'RESET',
                onClick: () => {
                  sliderRef.reset()
                },
              },
              {
                component: 'Button',
                text: 'CLEAE',
                onClick: () => {
                  sliderRef.clear()
                },
              },
            ],
          },
        ],
      }
    },
  }
})
