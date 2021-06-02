define([], function () {
  return {
    title: '带图标',
    file: 'icon',
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
                item: { icon: 'info-circle', text: 'Home' },
                panel: {
                  children: 'home content',
                },
              },
              {
                item: { icon: 'clock', text: 'Profile' },
                panel: {
                  children: 'profile content',
                },
              },
              {
                item: { icon: 'calendar', text: 'Contact' },
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
