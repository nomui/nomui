define([], function () {
  return {
    title: '自动处理精度',
    file: 'limit-input',
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
              label: '自动处理精度(四舍五入)',
              name: 'precision',
              component: 'Numberbox',
              precision: 2,
              limitInput: true,
            },
            {
              component: 'Field',
              label: '',
              control: {
                component: 'Button',
                text: '提交',
                type: 'Primary',
                onClick: function () {
                  group.validate()
                  // eslint-disable-next-line
                  console.log(group.getValue())
                },
              },
            },
          ],
        },
      }
    },
  }
})
