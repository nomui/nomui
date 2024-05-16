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
                text: 'underline',
                value: 'underline',
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
            styles: {
              padding: 2,
              color: 'lgray-dark'
            },
            children: {
              component: 'Tabs',
              ref: (c) => {
                tabs = c
              },
              styles: {
                color: 'white'
              },
              tabs: [
                {
                  item: { text: 'Home' },
                  panel: {
                    styles: {
                      padding: 1
                    },
                    children: 'home content',
                  },
                },
                {
                  item: { text: 'Profile' },
                  panel: {
                    styles: {
                      padding: 1
                    },
                    children: 'profile content',
                  },
                },
                {
                  item: { text: 'Contact' },
                  panel: {
                    styles: {
                      padding: 1
                    },
                    children: 'contact content',
                  },
                },
              ],
            },
          }
        ],
      }
    },
  }
})
