define([], function () {
  return {
    title: '事件处理',
    file: 'events',
    description: '该示例演示了同一行记录内的字段通讯，以及整个字段表格字段值变更的事件处理',
    demo: function () {
      const amountMap = {
        交通费: 100,
        通讯费: 200,
        住宿费: 300,
        餐饮费: 400,
      }

      return {
        component: 'Form',
        line: 'outline',
        striped: true,
        fields: [
          {
            component: 'GroupGrid',
            label: '报销明细',
            groupDefaults: {
              nowrap: true,
              fields: [
                {
                  component: 'Select',
                  name: 'type',
                  label: '类别',
                  options: [
                    { text: '交通费', value: '交通费' },
                    { text: '通讯费', value: '通讯费' },
                    { text: '住宿费', value: '住宿费' },
                    { text: '餐饮费', value: '餐饮费' },
                  ],
                  onValueChange: ({ sender, newValue }) => {
                    sender.group.getField('amount').setValue(amountMap[newValue])
                  },
                },
                {
                  component: 'Numberbox',
                  name: 'amount',
                  presision: 2,
                  label: '金额',
                  readonly: true,
                },
              ],
            },
            onValueChange: ({ sender }) => {
              let sum = 0
              sender.fields.forEach((field) => {
                sum += field.getField('amount').getValue()
              })
              sender.rootField.getField('sum').setValue(sum)
            },
          },
          {
            component: 'StaticText',
            name: 'sum',
            label: '费用总计',
            value: 0,
          },
        ],
      }
    },
  }
})
