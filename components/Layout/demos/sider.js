define([], function () {
  return {
    title: '带边栏',
    file: 'sider',
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
        sider: {
          children: '我是侧边栏，配置了我的时候，头部与脚部无效',
        },
        asider: {
          children: '我是另一边的侧边栏'
        }
      }
    },
  }
})
