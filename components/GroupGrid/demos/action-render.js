define([], function () {
  return {
    title: '自定义操作栏',
    file: 'action-render',
    demo: function () {
      let formRef = null

      return {
        component: 'Form',
        ref: (c) => {
          formRef = c
        },
        line: 'outline',
        striped: true,
        fields: [
          {
            component: 'GroupGrid',
            name: 'educations',
            label: '教育经历',
            onValueChange: (args) => {
              // eslint-disable-next-line
              console.log(args)
            },
            groupDefaults: {
              nowrap: true,
              // actionRender: false,
              actionRender: ({ row, grid }) => {
                return [
                  {
                    component: 'Button',
                    text: '移除',
                    onClick: () => {
                      row.remove()
                      grid._onValueChange()
                    },
                  },
                ]
              },
              fields: [
                {
                  component: 'Textbox',
                  name: 'school',
                  label: '学校名称',
                  required: true,
                },
                {
                  component: 'Numberbox',
                  name: 'startYear',
                  label: '入学年份',
                },
              ],
            },

            value: [
              { school: '小学', startYear: '2000' },
              { school: '大学', startYear: '2012' },
            ],
          },
        ],
        action: [
          {
            component: 'Button',
            text: 'getValue',
            onClick: () => {
              // eslint-disable-next-line
              console.log(formRef.getValue())
            },
          },
          {
            component: 'Button',
            text: 'validate',
            onClick: () => {
              formRef.validate()
            },
          },
        ],
      }
    },
  }
})
