define([], function () {

  return {
    title: '标签显示及对齐',
    file: 'label-align',
    demo: function () {
      let field = null
      let radioList = null

      return {
        component: 'Rows',
        items: [
          {
            component: 'Cols',
            attrs: {
              style: {
                minHeight: '40px'
              },
            },
            items: [
              {
                component: 'Checkbox',
                text: '不显示标签',
                onValueChange: (args) => {
                  if (args.newValue === true) {
                    radioList.hide()
                    field.update({
                      notShowLabel: true
                    })
                  }
                  else {
                    radioList.show()
                    field.update({
                      labelAlign: radioList.getValue(),
                      notShowLabel: false
                    })
                  }
                }
              },
              {
                component: 'RadioList',
                ref: (c) => {
                  radioList = c
                },
                options: [
                  {
                    text: 'left',
                    value: 'left',
                  },
                  {
                    text: 'right',
                    value: 'right',
                  },
                  {
                    text: 'top',
                    value: 'top',
                  },
                ],
                value: 'right',
                uistyle: 'button',
                onValueChange: (args) => {
                  field.update({
                    labelAlign: args.newValue,
                  })
                },
              },
            ]
          },
          {
            component: 'Textbox', label: '姓名',
            ref: (c) => {
              field = c
            },
            labelAlign: 'right',
            action: [{ component: 'Button', text: '我是操作' }]
          },
        ],
      }
    },
  }

})
