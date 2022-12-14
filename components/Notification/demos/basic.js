define([], function () {
  return {
    title: '基本用法',
    file: 'basic',
    demo: function () {
      return {
        children: {
          component: 'Flex',
          // strechIndex: 0,
          rows: [
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
        },
      }
    },
    description:
      '最简单的用法，4.5 秒后自动关闭。',
  }
})
