define([], function () {
  return {
    title: '带图标',
    file: 'with-icon',
    demo: function () {
      return {
        component: 'Rows',
        items: [
          {
            component: 'Textbox',
            leftIcon: 'user',
            placeholder: '左图标',
          },
          {
            component: 'Textbox',
            rightIcon: 'check-circle',
            placeholder: '右图标',
          },
          {
            component: 'Textbox',
            leftIcon: 'left',
            rightIcon: 'right',
            placeholder: '左右图标',
          },
        ],
      }
    },
  }
})
