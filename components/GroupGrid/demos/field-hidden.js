define([], function () {
  return {
    title: '字段隐藏',
    file: 'field-hidden',
    description: '设置 `Field` 的 `hidden` 为 `true`，会将该字段列隐藏',
    demo: function () {
      return {
        component: 'Form',
        line: 'outline',
        striped: true,
        fields: [
          {
            component: 'GroupGrid',
            name: 'educations',
            label: '隐藏第二列字段',
            groupDefaults: {
              nowrap: true,
              fields: [
                {
                  component: 'Textbox',
                  name: 'first',
                  label: '第一列',
                  required: true,
                },
                {
                  component: 'Numberbox',
                  name: 'second',
                  label: '第二列',
                  hidden: true,
                },
                {
                  component: 'Textbox',
                  name: 'third',
                  label: '第三列',
                  required: true,
                },
                {
                  component: 'Numberbox',
                  name: 'forth',
                  label: '第四列',
                },
                {
                  component: 'Textbox',
                  name: 'fifth',
                  label: '第五列',
                  required: true,
                },
                {
                  component: 'Numberbox',
                  name: 'sixth',
                  label: '第六列',
                },
              ],
            },

            value: [{ first: '1', second: '2', third: '3', forth: '4', fifth: '5', sixth: '6' }],
          },
        ],
      }
    },
  }
})
