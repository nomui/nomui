define([], function () {
  return {
    title: '控制激活的tab',
    file: 'basic',
    demo: function () {
      let tabRef
      return {
        children: [
          {
            component: 'Cols',
            items: [
              {
                component: 'Button',
                text: '激活Profile',
                onClick: function () {
                  tabRef.selectTab('profile')
                },
              },
              {
                component: 'Button',
                text: '获取选中Tab',
                onClick: function () {
                  // eslint-disable-next-line no-alert
                  alert(`选中的Tab:${tabRef.getSelectedTab().key}`)
                },
              },
            ],
          },
          {
            component: 'Tabs',
            ref: (c) => {
              tabRef = c
            },
            uistyle: 'line',
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
                key: 'contract',
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
