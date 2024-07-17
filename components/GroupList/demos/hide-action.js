define([], function () {
  let group
  return {
    title: '隐藏添加按钮',
    file: 'hide-action',
    demo: function () {
      return {
        component: 'Form',
        line: 'outline',
        striped: true,
        fields: [
          {
            component: 'GroupList',
            label: '教育经历',
            hideAction: true,
            ref: (c) => {
              group = c
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
                },
                {
                  component: 'Numberbox',
                  name: 'startYear',
                  label: '入学年份',
                },
              ],
            },

            value: [
              { school: '小学', age: '7' },
              { school: '大学', age: '18' },
            ],
          },
          {
            component: 'Button',
            text: '添加一行',
            type: 'primary',
            onClick: () => {
              group.addGroup({ school: '幼儿园' })
            },
          },
        ],
      }
    },
  }
})
