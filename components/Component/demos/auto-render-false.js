define([], function () {
  return {
    title: '异步更新',
    file: 'auto-render-false',
    description:'配置 `autoRender` 为 false，这样组件不会自动渲染，然后在 `onCreated` 生命周期钩子函数中异步更新 ',
    demo: function () {
      let asyncRef = null
      return {
        children: [
          {
            children: '我是第一个节点',
          },
          {
            ref: (c) => {
              asyncRef = c
            },
            autoRender: false,
            children: '我是中间异步更新节点',
          },
          {
            children: '我是最后一个节点',
          },
        ],
        onCreated: () => {
          setTimeout(function () {
            asyncRef.update()
          }, 500)
        },
      }
    },
  }
})
