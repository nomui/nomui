define([], function () {
  return {
    title: '自定义操作栏',
    file: 'action-render',
    demo: function () {
      return {
        component: 'Form',
        line: 'outline',
        striped: true,
        fields: [
          {
            component: 'GroupList',
            label: '教育经历',
            ref: (c) => {
              window.group = c
            },
            onValueChange: (args) => {
              // eslint-disable-next-line
              console.log(args)
            },
            groupDefaults: {
              nowrap: true,
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
              actionRender: ({ group, groupList }) => {
                return [
                  {
                    component: 'Button',
                    text: '校验',
                    onClick: () => {
                      group.validate()
                    },
                  },
                  {
                    component: 'Button',
                    icon: 'minus',
                    onClick: () => {
                      groupList.removeGroup(group)
                    },
                  },
                ]
              },
            },

            value: [
              { school: '小学', age: '7' },
              { school: '大学', age: '18' },
            ],
          },
        ],
      }
    },
  }
})
