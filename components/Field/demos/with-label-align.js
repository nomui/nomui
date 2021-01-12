define([], function () {
  return {
    title: 'label对齐方式',
    file: 'with-label-align',
    demo: function () {
      return {
        component: 'Rows',
        items: [
          {
            component: 'Field',
            label: '姓名',
            ref: 'myInput',
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
                events: {
                  valueChange: (e) => {
                    this.refs.myInput.update({
                      labelAlign: e.newValue,
                    })
                  },
                },
              },
            ],
          },
        ],
      }
    },
  }
})
