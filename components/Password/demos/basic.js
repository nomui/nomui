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
            name: 'password',
            label: '密码',
            component: 'Password',
            required: true,
            value: 'abcdefg12345',
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
      '密码框的基础用法，右侧图标可展示密码的真实值',
  }
})
