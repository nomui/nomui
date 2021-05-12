define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'Cols',
        items: [
          {
            component: 'Button',
            text: '提交',
            popconfirm: {
              title: '提交报告',
              content: '报告一经递交不可修改，是否确定要提交？',
              onConfirm: () => {
                new nomui.Message({
                  content: '提交成功',
                  type: 'info',
                })
              },
            },
          },
        ],
      }
    },
  }
})
