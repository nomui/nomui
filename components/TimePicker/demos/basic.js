define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      let form = null

      return {
        component: 'Form',
        ref: (c) => {
          form = c
        },
        fields: [
          {
            name: 'timepicker',
            label: '时间选择',
            component: 'TimePicker',
          },

          {
            label: '',
            control: {
              component: 'Button',
              text: '提交',
              onClick: () => {
                form.validate()
                console.log(form.getValue())
              },
            },
          },
        ],
      }
    },
    description:
      'timePicker的基础用法，在浮层中选择某一时间 ',
  }
})
