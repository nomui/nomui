define([], function () {
  return {
    title: '带工具栏',
    file: 'tools',
    demo: function () {
      return {
        children: [
          {
            component: 'Tabs',
            onTabSelectionChange: ({ key }) => {
              console.log(`选中的key:${key}`)
            },
            tools: {
              component: 'Button',
              text: '工具按钮',
            },

            tabs: [
              {
                key: 'home',
                item: { text: 'Home' },
                panel: {
                  children: 'home content',
                },
              },
              {
                key: 'profile',
                item: { text: 'Profile' },
                panel: {
                  children: 'profile content',
                },
              },
              {
                key: 'contact',
                item: { text: 'Contact' },
                panel: {
                  children: 'contact content',
                },
              },
            ],
          },
        ],
      }
    },
  }
})
