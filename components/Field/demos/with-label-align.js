define([], function () {
  return {
    title: 'label对齐方式',
    file: 'with-label-align',
    demo: function () {
      let myInputRef = null
      return {
        component: 'Rows',
        items: [
          {
            component: 'Field',
            label: '姓名',
            ref: (c) => {
              myInputRef = c
            },
            labelAlign: 'left',
            control: {
              component: 'Textbox',
            },
          },
          {
            children: [
              {
                component: 'RadioList',
                options: [
                  {
                    text: 'left',
                    value: 'left',
                  },
                  {
                    text: 'right',
                    value: 'right',
                  },
                ],
                uistyle: 'button',
                onValueChange: (e) => {
                  myInputRef.update({
                    labelAlign: e.newValue,
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
