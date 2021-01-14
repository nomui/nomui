define([], function () {
  return {
    title: '基本用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'Layout',
        header: {
          children: '我是头部',
        },
        body: {
          children: '我是身体',
        },
        footer: {
          children: '我是脚部',
        },
      }
    },
  }
})
