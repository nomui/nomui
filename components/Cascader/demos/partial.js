define(['./data.js'], function (options) {
  let cascader = null
  return {
    title: '选择及改变',
    file: 'partial',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'small',
        rows: [
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
            changeOnSelect: true,
            onValueChange(changed) {
              // eslint-disable-next-line
              console.log(changed)
            },
            options,
          },
          {
            component: 'Flex',
            gap: 'small',
            cols: [
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
