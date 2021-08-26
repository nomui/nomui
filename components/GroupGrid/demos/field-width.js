define([], function () {
  return {
    title: '字段列宽度',
    file: 'field-width',
    description: '设置 `Field` 的 `width`，会做为 `Grid` 的列宽度',
    demo: function () {
      return {
        component: 'Form',
        line: 'outline',
        striped: true,
        fields: [
          {
            component: 'GroupGrid',
            name: 'educations',
            label: '不同宽度',
            groupDefaults: {
              nowrap: true,
              fields: [
                {
                  component: 'Textbox',
                  name: 'first',
                  label: '100',
                  width: 100,
                },
                {
                  component: 'Numberbox',
                  name: 'second',
                  label: '150',
                  width: 150,
                },
                {
                  component: 'Textbox',
                  name: 'third',
                  label: '200',
                  width: 200,
                },
                {
                  component: 'Numberbox',
                  name: 'forth',
                  label: '300',
                  width: 300,
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
