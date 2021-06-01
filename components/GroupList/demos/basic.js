define([], function () {
  let group = null
  return {
    title: '基础用法',
    file: 'basic',
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
              group = c
            },
            onValueChange: () => {
              console.log(group.getValue())
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

            value: [{ school: '小学' }, { school: '大学' }],
          },
        ],
      }
    },
  }
})
