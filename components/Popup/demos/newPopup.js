define([], function () {
  let mybutton = null
  return {
    title: '弹出其他视图',
    file: 'newPopup',
    demo: function () {
      return {
        component: 'Cols',
        items: [
          {
            component: 'Button',
            text: '点击弹出',
            ref: (c) => {
              mybutton = c
            },
          },
        ],
        _rendered: () => {
          new nomui.Popup({ trigger: mybutton, children: '我也是弹出层' })
        },
      }
    },
  }
})
