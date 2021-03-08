define([], function () {
  return {
    title: '选项与内容分开',
    file: 'separate',
    demo: function () {
      let tabContent

      return {
        component: 'Panel',
        header: {
          styles: {
            justify: 'between',
          },
          caption: {
            title: 'Panel title',
          },
          tools: [
            {
              component: 'TabList',
              tabContent: () => {
                return tabContent
              },
              selectedItems: 'tab1',
              onTabSelectionChange: () => {
                console.log('Changed')
              },
              items: [
                {
                  key: 'tab1',
                  text: 'Tab 1',
                },
                {
                  key: 'tab2',
                  text: 'Tab 2',
                },
              ],
            },
          ],
        },
        body: {
          children: {
            component: 'TabContent',
            ref: (c) => {
              tabContent = c
            },
            selectedPanel: 'tab1',

            panels: [
              {
                key: 'tab1',
                children: 'Tab 1 content',
              },
              {
                key: 'tab2',
                children: 'Tab 2 content',
              },
            ],
          },
        },
        children: [
          {
            component: 'Tabs',
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
