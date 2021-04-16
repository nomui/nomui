define([], function () {
  return {
    title: 'flex属性配置',
    file: 'flex',
    demo: function () {
      return {
        component: 'Rows',
        items: [
          {
            component: 'Panel',
            header: {
              caption: {
                title: 'justify',
              },
            },
            body: {
              children: {
                component: 'Cols',
                items: [
                  {
                    component: 'Button',
                    text: 'item',
                  },
                  {
                    component: 'Button',
                    text: 'item',
                  },
                ],

                justify: 'center',
              },
            },
          },
          {
            component: 'Panel',
            header: {
              caption: {
                title: 'inline',
              },
            },
            body: {
              children: {
                component: 'Cols',
                items: [
                  {
                    component: 'Button',
                    text: 'item',
                  },
                  {
                    component: 'Button',
                    text: 'item',
                  },
                ],

                inline: true,
              },
            },
          },
          {
            component: 'Panel',
            header: {
              caption: {
                title: 'fills',
              },
            },
            body: {
              children: {
                component: 'Cols',
                items: [
                  {
                    component: 'Button',
                    text: 'item',
                  },
                  {
                    component: 'Button',
                    text: 'item',
                  },
                ],

                fills: true,
              },
            },
          },
        ],
      }
    },
  }
})
