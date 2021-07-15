define([], function () {
  return {
    title: '拓展展示信息',
    file: 'extra',
    demo: function () {
      return {
        component: 'Textbox',
        label: '姓名',
        labelAlign: 'right',
        extra: 'Please input your chinese name',
        action: [{ component: 'Button', text: '我是操作' }],
      }
    },
  }
})
