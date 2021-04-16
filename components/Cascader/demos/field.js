define(['./data.js'], function (options) {
  let cascader = null
  return {
    title: '字段值',
    file: 'field',
    demo: function () {
      return {
        component: 'Rows',
        items: [
          {
            component: 'Cascader',
            name: 'treatment',
            label: '治疗领域',
            labelAlign: 'left',
            ref: (c) => {
              cascader = c
            },
            placeholder: '请选择',
            fieldsMapping: {
              key: 'Id',
              label: 'Name',
              value: 'Name',
              children: 'Childs',
            },
            value: ['内分泌', '肥胖症', 'bbb'],
            onValueChange(changed) {
              // eslint-disable-next-line
              console.log(changed)
            },
            options,
          },
          {
            component: 'Cols',
            items: [
              {
                component: 'Button',
                text: 'Set value to aaa',
                onClick: () => {
                  cascader.setValue(['内分泌', '肥胖症', 'aaa'])
                },
              },
              {
                component: 'Button',
                text: 'Reset',
                onClick: () => {
                  cascader.reset()
                },
              },
              {
                component: 'Button',
                text: 'Clear',
                onClick: () => {
                  cascader.clear()
                },
              },
              {
                component: 'Button',
                text: 'Get Value',
                onClick: () => {
                  new nomui.Alert({
                    title: '当前选中的值',
                    type: 'info',
                    description: JSON.stringify(cascader.getValue()),
                  })
                },
              },
            ],
          },
        ],
      }
    },
  }
})
