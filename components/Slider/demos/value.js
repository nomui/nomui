define([], function () {
  return {
    title: '表单值',
    file: 'value',
    demo: function () {
      let textRef = null
      let sliderRef = null

      return {
        component: 'Flex',
        gap: 'small',
        rows: [
          {
            component: 'Form',

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
                  textRef.setValue(newValue, { triggerChange: false })
                },
              },
              {
                component: 'Numberbox',
                ref: (c) => {
                  textRef = c
                },
                span: 4,
                min: 0,
                max: 100,
                name: 'text',
                value: 15,
                onValueChange: ({ newValue }) => {
                  sliderRef.setValue(newValue, { triggerChange: false })
                },
              },
            ],
          }
        ],
      }
    },
  }
})
