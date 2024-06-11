define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'Container',
        children: [
          {
            component: 'Button',
            type: 'primary',
            text: 'open',
            onClick: () => {
              new nomui.Drawer({
                width: '80%',
                title: '标题',
                getContainer: () => document.body,
                content: {
                  component: 'Form',
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
                      component: 'RadioList',
                      name: 'gender',
                      label: '性别',
                      options: [
                        { text: '男', value: 0 },
                        { text: '女', value: 1 },
                      ],
                    },
                  ],
                },
              })
            },
          },
        ],
      }
    },
  }
})
