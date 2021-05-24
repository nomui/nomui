define([], function () {
  return {
    title: '弹出其他视图',
    file: 'view',
    demo: function () {
      return {
        children: [
          {
            component: 'Button',
            name: 'button',
            text: '点我',
            attrs: {
              onclick: function () {
                // 在view-content页面可以通过modal.props.data获取传递过去的数据
                new nomui.Modal({
                  data: {
                    id: 'xxx',
                  },
                  content: '/components/Modal/demos/view-content.js',
                })
              },
            },
          },
        ],
      }
    },
  }
})
