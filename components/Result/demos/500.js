define([], function () {
  return {
    title: '500',
    file: '500',
    description: '服务器发生了错误',
    demo: function () {
      return {
        component: 'Result',
        status: '500',
        title: '500',
        subTitle: '对不起，网络异常请重试',
        extra: [
          {
            component: 'Button',
            type: 'link',
            text: '返回首页',
          },
        ],
      }
    },
  }
})
