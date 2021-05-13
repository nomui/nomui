define([], function () {
  return {
    title: '自定义图标',
    file: 'custom-icon',
    description: '自定义 icon',
    demo: function () {
      return {
        component: 'Result',
        icon: 'github',
        // icon: {
        //   component: 'Icon',
        //   type: 'github',
        // },
        title: 'Great, we have done all the operations!',
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
