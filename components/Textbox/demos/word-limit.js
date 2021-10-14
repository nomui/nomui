define([], function () {
  return {
    title: '输入长度限制',
    file: 'word-limit',
    demo: function () {
      return {
        component: 'Rows',
        items: [
          {
            component: 'Textbox',
            placeholder: '通过配置maxlength和showWordLimit展示字符限制',
            maxlength: 10,
            showWordLimit: true,
          },
        ],
      }
    },
  }
})
