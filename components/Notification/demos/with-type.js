define([], function () {
  return {
    title: '类型图标',
    file: 'with-key',
    demo: function () {
      return {
        children: {
          component: 'Flex',
          gap: 'small',
          cols: [
            {
              component: 'Button',
              text: 'success',
              onClick: () => {
                nomui.Notification.success({
                  title: '收款提醒',
                  description: '收到用户付款100000万元',
                })
              },
            },
            {
              component: 'Button',
              text: 'info',
              onClick: () => {
                nomui.Notification.info({
                  title: '收款提醒',
                  description: '收到用户付款100000万元',
                })
              },
            },
            {
              component: 'Button',
              text: 'warning',
              onClick: () => {
                nomui.Notification.warning({
                  title: '收款提醒',
                  description: '收到用户付款100000万元',
                })
              },
            },
            {
              component: 'Button',
              text: 'error',
              onClick: () => {
                nomui.Notification.error({
                  title: '收款提醒',
                  description: '收到用户付款100000万元',
                })
              },
            },
            {
              component: 'Button',
              text: 'open 自定义图标',
              onClick: () => {
                nomui.Notification.open({
                  title: '收款提醒',
                  description: '收到用户付款100000万元',
                  icon: 'question-circle',
                })
              },
            },
          ],
        },
      }
    },
  }
})
