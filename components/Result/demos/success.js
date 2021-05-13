define([], function () {
  return {
    title: 'Success',
    file: 'success',
    description: '成功的结果',
    demo: function () {
      return {
        component: 'Result',
        status: 'success',
        title: '成功递交表单',
        subTitle: '递交企业:湖南微试云',
        extra: [
          {
            component: 'Button',
            type: 'primary',
            text: '返回首页',
          },
          {
            component: 'Button',
            text: '返回',
          },
        ],
      }
    },
  }
})
