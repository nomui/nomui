define([], function () {

  return {
    title: '标签对齐方式',
    file: 'label-align',
    demo: function () {
      let field = null

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
            onValueChange: (args) => {
              field.update({
                labelAlign: args.newValue,
              })
            },
          },
          {
            component: 'Textbox', label: '姓名',
            ref: (c) => {
              field = c
            },
            labelAlign: 'right',
          },
        ],
      }
    },
  }

})
