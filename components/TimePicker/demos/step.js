define([], function () {
  return {
    title: '步长',
    file: 'step',
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
            label: '带步长',
            component: 'TimePicker',
            hourStep: 3,
            minuteStep: 15,
            secondStep: 15,
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
      '自定义浮层数字根据配置的倍速展示',
  }
})
