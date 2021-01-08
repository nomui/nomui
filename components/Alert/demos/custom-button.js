define([], function () {
  return {
    title: '自定义按钮',
    file: 'custom-button.js',
    demo: function () {
      return {
        children: [
          {
            component: 'Button',
            text: '自定义按钮',
            attrs: {
              onclick: function () {
                new nomui.Alert({
                  title: 'hello',
                  ok: {
                    callback: () => {
                      alert('点击了确定按钮')
                    },
                  },
                  cancel: {
                    component: 'Button',
                    text: '取消',
                    // Warning: 这样是不行的，events是不能被覆盖的
                    // events: {
                    //   click: function () {},
                    // },
                  },
                })
              },
            },
          },
        ],
      }
    },
  }
})
