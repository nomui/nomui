define([], function () {
  return {
    title: '自定义',
    file: 'custom',
    demo: function () {
      return {
        children: {
          component: 'Cols',
          items: [
            {
              component: 'Button',
              text: '自定义宽度200px',
              onClick: () => {
                nomui.Notification.open({
                  title: '温馨提示',
                  description: '收到用户付款100000万元',
                  attrs: {
                    style: {
                      width: '200px',
                    },
                  },
                })
              },
            },
          ],
        },
      }
    },
  }
})
