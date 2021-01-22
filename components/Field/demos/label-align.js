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
              {
                text: 'top',
                value: 'top',
              },
            ],
            value: 'right',
            uistyle: 'button',
            onValueChange: (e) => {
              myInputRef.update({
                labelAlign: e.newValue,
              })
            },
          },
          {
            component: 'Textbox', label: '姓名',
            ref: (c) => {
              myInputRef = c
            },
            labelAlign: 'right',
          },
        ],
      }
    },
  }

})
