define([], function () {
  return {
    title: '异步模态框视图内容',
    file: 'async-view',
    description:
      '通过 `content` 配置 url 指向视图内容时，视图 js 模块可返回一个 promise (该 prosmise 返回模态框内容的配置对象)。本示例的异步函数用的 es 6 的 promise，实际业务代码中多为 ajax 请求。',
    demo: function () {
      return {
        children: {
          component: 'Button',
          name: 'button',
          text: '异步视图内容',
          onClick: () => {
            new nomui.Drawer({
              content: '/components/Drawer/demos/async-view-content.js',
            })
          },
        },
      }
    },
  }
})
