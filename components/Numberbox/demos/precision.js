define([], function () {
  return {
    title: '带小数位数',
    file: 'precision',
    demo: function () {
      let group
      return {
        children: {
          component: 'Form',
          ref: (c) => {
            group = c
          },
          fields: [
            {
              label: '必须输入两位小数',
              name: 'precision',
              component: 'Numberbox',
              precision: 2,
            },
            {
              label: '最多输入三位小数',
              name: 'maxprecision',
              component: 'Numberbox',
              maxPrecision: 3,
            },
            {
              component: 'Field',
              label: '',
              control: {
                component: 'Button',
                text: '校验',
                type: 'Primary',
                onClick: function () {
                  group.validate()
                },
              },
            },
          ],
        },
      }
    },
    description:
      '对输入内容自定义校验',
  }
})
