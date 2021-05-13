define([], function () {
  return {
    title: 'Warning',
    file: 'warning',
    description: '警告类型的结果',
    demo: function () {
      return {
        component: 'Result',
        status: 'warning',
        title: '这儿还有些问题需要处理',
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
