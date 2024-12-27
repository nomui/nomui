define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    description: '可以自定义图标颜色及背景色',
    demo: function () {
      return {
        component: 'Tabs',
        onTabSelectionChange: ({ key }) => {
          console.log(`选中的key:key`)
        },
        tabs: [
          {
            key: 'home',
            item: { text: 'Home' },
            panel: {
              children: {
                component: 'Flex',
                items: [
                  {
                    component: 'Avatar',
                    text: '小马',
                  },
                  {
                    component: 'Avatar',
                    text: '小马',
                    attrs: {
                      style: {
                        color: '#fff',
                        backgroundColor: '#ff8787',
                      },
                    },
                  },
                ],
              }
            },
          },
          {
            key: 'profile',
            item: { text: 'Profile' },
            panel: {
              children: {
                component: 'Flex',
                items: [
                  {
                    component: 'Avatar',
                    text: 'XXG',
                  },
                  {
                    component: 'Avatar',
                    text: 'Admin',
                    attrs: {
                      style: {
                        color: '#fff',
                        backgroundColor: '#ff8787',
                      },
                    },
                  },
                ],
              }
            },
          },
        ],
      }
    },
  }
})
