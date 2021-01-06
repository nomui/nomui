define([], function () {
  return {
    title: '界面风格',
    file: 'uistyle',
    demo: function () {
      const demo = this

      return {
        component: 'Rows',
        items: [
          {
            component: 'RadioList',
            uistyle: 'button',
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
            events: {
              valueChange: function (changed) {
                demo.refs.tabs.update({ uistyle: changed.newValue })
              },
            },
          },
          {
            component: 'Tabs',
            ref: 'tabs',
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
