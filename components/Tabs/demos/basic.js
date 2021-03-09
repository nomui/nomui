define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        children: [
          {
            component: 'Tabs',
            onTabSelectionChange: () => {
              console.log('Tab Changed')
            },
            tabs: [
              {
                item: { text: 'Home' },
                panel: {
                  children: 'home content',
                },
              },
              {
                item: { text: 'Profile' },
                panel: {
                  children: 'profile content',
                },
              },
              {
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
