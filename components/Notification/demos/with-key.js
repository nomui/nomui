define([], function () {
  return {
    title: '指定key',
    file: 'with-key',
    demo: function () {
      return {
        children: {
          component: 'Cols',
          items: [
            {
              component: 'Button',
              text: '打开通知窗',
              onClick: () => {
                nomui.Notification.open({
                  title: '收款提醒',
                  description: `收到用户付款100000万元${new Date().format('yyyy-mm-dd HH:mm:ss')}`,
                  duration: null,
                  key: 'test',
                })
              },
            },
            {
              component: 'Button',
              text: '关闭收款提醒',
              onClick: () => {
                nomui.Notification.close('test')
              },
            },
          ],
        },
      }
    },
  }
})
