define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        children: [
          {
            component: 'Tabs',
            onTabSelectionChange: ({ key }) => {
              console.log(`选中的key:${key}`)
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
