define([], function () {
  return {
    title: '限定时间范围',
    file: 'min-max',
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
            minTime: '08:08:08',
            maxTime: '20:20:20',
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
  }
})
