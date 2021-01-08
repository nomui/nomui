define([], function () {
  return {
    title: '基本用法',
    file: 'basic',
    demo: function () {
      return {
        children: [
          {
            component: 'Button',
            text: '普通',
            attrs: {
              onclick: function () {
                new nomui.Alert({
                  title: 'hello',
                })
              },
            },
          },
        ],
      }
    },
  }
})
