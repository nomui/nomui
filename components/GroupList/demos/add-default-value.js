define([], function () {
  return {
    title: '添加默认值',
    file: 'add-default-value',
    demo: function () {
      return {
        component: 'Form',
        line: 'outline',
        striped: true,
        fields: [
          {
            component: 'GroupList',
            label: '教育经历',
            addDefaultValue: { school: '蓝翔技校', startYear: 2046 },
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
