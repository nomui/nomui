define([], function () {
  return {
    title: '不可清空',
    file: 'allowClear',
    demo: function () {
      return {
        children: {
          component: 'Textbox',
          placeholder: 'allowClear false',
          value: '无清除按钮',
          allowClear: false,
        },
      }
    },
  }
})
