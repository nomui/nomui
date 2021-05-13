define([], function () {
  return {
    title: '403',
    file: '403',
    description: '你没有此页面的访问权限',
    demo: function () {
      return {
        component: 'Result',
        status: '403',
        title: '403',
        subTitle: '对不起，您没有权限访问该页面',
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
