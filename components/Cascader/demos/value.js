define(['./data.js'], function (options) {
  let cascade = null
  return {
    title: 'value类型',
    file: 'basic',
    demo: function () {
      return {
        component: 'Rows',
        items: [
          {
            component: 'Cascader',
            placeholder: '请选择',
            ref: (c) => {
              cascade = c
            },
            fieldsMapping: {
              key: 'Id',
              label: 'Name',
              value: 'Name',
              children: 'Childs',
            },
            valueType: 'single',
            showArrow: false,
            value: 'aaa',
            options,
          },
          {
            component: 'Cols',
            items: [
              {
                component: 'Switch',
                selectedText: '级联取值',
                unselectedText: '单值取值',
                onValueChange({ newValue }) {
                  if (newValue) {
                    cascade.update({ valueType: 'cascade' })
                  } else {
                    cascade.update({ valueType: 'single' })
                  }
                },
              },
              {
                component: 'Button',
                text: 'Get Value',
                onClick: () => {
                  new nomui.Alert({
                    title: '当前选中值',
                    type: 'info',
                    description: JSON.stringify(cascade.getValue()),
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
