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
    description:
      '当allowClear为false时,文本框不能被清除',

  }
})
