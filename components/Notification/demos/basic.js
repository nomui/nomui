define([], function () {
  return {
    title: '基本用法',
    file: 'basic',
    demo: function () {
      return {
        children: [
          {
            component: 'Button',
            text: '打开通知窗',
            onClick: () => {
              nomui.Notification.open({
                title: '温馨提示',
                description: '收到用户付款100000万元',
              })
            },
          },
        ],
      }
    },
  }
})
