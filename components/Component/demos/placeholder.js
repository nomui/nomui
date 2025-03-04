define([], function () {
  return {
    title: '配置占位元素',
    file: 'placeholder',
    description: 'placeholderProps可以配置占位元素的尺寸与是否在组件加载状态时显示loading特效',
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
            placeholderProps: {
              //   height: 100,
              loading: true,
            },
            children: '我是异步更新节点,在我加载完成之前会显示loading动画',
          },
        ],
        onCreated: () => {
          setTimeout(function () {
            asyncRef.update()
          }, 3000)
        },
      }
    },
  }
})
