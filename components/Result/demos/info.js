define([], function () {
  return {
    title: 'Info',
    file: 'info',
    description: '展示处理结果',
    demo: function () {
      return {
        component: 'Result',
        title: '您的操作已经处理',
        extra: [
          {
            component: 'Button',
            text: '返回首页',
          },
        ],
      }
    },
  }
})
