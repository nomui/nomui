define([], function () {
  return {
    title: '异步数据',
    file: 'template',
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
        _created: function () {
          setTimeout(function () {
            asyncRef.update()
          }, 500)
        },
      }
    },
  }
})
