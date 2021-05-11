define([], function () {
  return {
    title: '404',
    file: '404',
    description: '此页面未找到',
    demo: function () {
      return {
        component: 'Result',
        status: '404',
        title: '404',
        subTitle: '对不起，您访问的页面不存在',
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
