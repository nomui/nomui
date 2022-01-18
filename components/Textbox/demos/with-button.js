define([], function () {
  return {
    title: '带按钮',
    file: 'with-button',
    demo: function () {
      return {
        children: [
          {
            component: 'Textbox',
            button: {
              text: '搜 索',
            },
          },
          {
            component: 'Textbox',
            rightIcon: 'right',
            button: {
              rightIcon: 'search',
            },
          },
        ],
      }
    },
  }
})
