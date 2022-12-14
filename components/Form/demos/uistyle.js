define([], function () {
  return {
    title: '界面风格',
    file: 'styles',
    demo: function () {
      let form = null

      return {
        component: 'Flex',
        gap: 'small',
        rows: [
          {
            component: 'Cols',
            items: [
              {
                component: 'RadioList',
                uistyle: 'button',
                options: [
                  { text: '默认', value: null },
                  { text: 'table', value: 'table' },
                  { text: 'inline', value: 'inline' },
                ],
                value: 'table',
                onValueChange: (args) => {
                  form.update({
                    uistyle: args.newValue,
                  })
                },
              },
            ],
          },
          {
            component: 'Form',
            ref: (c) => {
              form = c
            },
            uistyle: 'table',
            fields: [
              {
                component: 'Textbox',
                name: 'name',
                label: '姓名',
              },
              {
                component: 'Numberbox',
                name: 'age',
                label: '年龄',
              },
              {
                component: 'Textbox',
                name: 'email',
                label: 'Email',
              },
              {
                component: 'Checkbox',
                name: 'test',
                label: 'test',
              },

              {
                component: 'RadioList',
                name: 'gender',
                label: '性别',
                options: [
                  { text: '男', value: 0 },
                  { text: '女', value: 1 },
                ],
              },
              {
                component: 'CheckboxList',
                name: 'hobbies',
                label: '爱好',
                options: [
                  { text: '唱歌', value: 1 },
                  { text: '跳舞', value: 2 },
                  { text: '旅游', value: 3 },
                ],
              },
            ],
            controlAction: [
              {
                component: 'Button',
                text: '保 存',
                type: 'primary',
              },
              {
                component: 'Button',
                text: '取 消',
              },
            ],
          },
        ],
      }
    },
  }
})
