define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'Flex',
        rows: [
          {
            component: 'Textbox',
          },
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
          {
            component: 'Cols',
            justify: 'end',
            items: [
              {
                component: 'Button',
                text: '提交',
                popconfirm: {
                  title: '提交报告',
                  content: () => {
                    return `报告${new Date().format(
                      'yyyy/MM/dd',
                    )}-001一经递交不可修改，是否确定要提交？`
                  },
                  onConfirm: () => {
                    new nomui.Message({
                      content: '提交成功',
                      type: 'info',
                    })
                  },
                },
              },
            ],
          },
        ],
      }
    },
    description:
      '目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示，询问用户。 和 confirm 弹出的全屏居中模态对话框相比，交互形式更轻量',
  }
})
