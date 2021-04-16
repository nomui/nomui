define([], function () {
  return {
    title: '界面风格',
    file: 'uistyle',
    demo: function () {
      let tabs = null

      return {
        component: 'Rows',
        items: [
          {
            component: 'RadioList',
            uistyle: 'button',
            value: 'plain',
            options: [
              {
                text: 'plain',
                value: 'plain',
              },
              {
                text: 'hat',
                value: 'hat',
              },
              {
                text: 'line',
                value: 'line',
              },
              {
                text: 'card',
                value: 'card',
              },
              {
                text: 'pill',
                value: 'pill',
              },
            ],
            onValueChange: function (e) {
              tabs.update({ uistyle: e.newValue })
            },
          },
          {
            component: 'Tabs',
            ref: (c) => {
              tabs = c
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
