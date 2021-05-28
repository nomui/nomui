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
            name: 'TimeRangePicker',
            label: '时间范围选择',
            component: 'TimeRangePicker',
            flatValue: true,
            fieldName: {
              start: 'start',
              end: 'end',
            },
            value: {
              start: '09:00:00',
              end: '17:30:00',
            },
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
