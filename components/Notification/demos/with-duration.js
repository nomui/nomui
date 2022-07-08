define([], function () {
  return {
    title: '指定延迟关闭时间',
    file: 'with-duration',
    demo: function () {
      return {
        children: {
          component: 'Flex',
          gap: 'small',
          cols: [
            {
              component: 'Button',
              text: '打开通知窗(4.5秒后自动关闭)',
              onClick: () => {
                nomui.Notification.open({
                  title: '温馨提示',
                  description: '收到用户付款100000万元',
                })
              },
            },
            {
              component: 'Button',
              text: '打开通知窗(6秒后自动关闭)',
              onClick: () => {
                nomui.Notification.open({
                  title: '温馨提示',
                  description: '收到用户付款100000万元',
                  duration: 6000,
                })
              },
            },
            {
              component: 'Button',
              text: '打开通知窗(不会自动关闭)',
              onClick: () => {
                nomui.Notification.open({
                  title: '温馨提示',
                  description: '收到用户付款100000万元',
                  duration: null,
                })
              },
            },
          ],
        },
      }
    },
  }
})
