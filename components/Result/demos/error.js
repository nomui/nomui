define([], function () {
  return {
    title: 'Error',
    file: 'error',
    description: '复杂的错误反馈',
    demo: function () {
      return {
        component: 'Result',
        status: 'error',
        title: '哦豁，系统崩溃了',
        subTitle: '请按照下面的步骤检查并修改您的表单后重新提交',
        extra: [
          {
            component: 'Button',
            type: 'primary',
            text: '返回首页',
          },
          {
            component: 'Button',
            text: '取消',
          },
        ],
        children: [
          {
            tag: 'h4',
            children: '检查并提交',
          },
          {
            tag: 'ul',
            children: [
              {
                tag: 'li',
                children: '网络状态',
              },
              {
                tag: 'li',
                children: '是否登录',
              },
              {
                tag: 'li',
                children: '是否有权限',
              },
            ],
          },
        ],
      }
    },
  }
})
