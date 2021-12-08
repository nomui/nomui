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
            name: 'DateRangePicker',
            label: '日期范围选择',
            component: 'DateRangePicker',
            flatValue: true,
            format: 'yyyy-MM-dd HH:mm',
            required: true,
            showTime: {
              format: 'HH:mm',
            },
            fieldName: {
              start: 'start',
              end: 'end',
            },
            value: {
              start: '2020-01-05 13:22',
              end: '2020-01-20 14:13',
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
