define([], function () {
  return {
    title: '显示按钮',
    file: 'with-button',
    demo: function () {
      return {
        children: {
          component: 'Cols',
          items: [
            {
              component: 'Button',
              text: '带默认按钮',
              onClick: () => {
                nomui.Notification.open({
                  title: '温馨提示',
                  description: '收到用户付款100000万元',
                  btn: true,
                })
              },
            },
            {
              component: 'Button',
              text: '自定义按钮内容',
              onClick: () => {
                nomui.Notification.open({
                  title: '温馨提示',
                  description: '收到用户付款100000万元',
                  btn: {
                    text: '不再提醒',
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
