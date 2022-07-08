define([], function () {
  return {
    title: 'window中',
    file: 'window',
    demo: function () {
      return {
        component: 'Flex',
        // align: 'start',
        cols: [
          {
            component: 'Anchor',
            sticky: true,
            container: window,
            items: [
              { text: '锚点1', key: 'div5' },
              {
                text: '锚点2',
                key: 'div6',
                items: [
                  { text: '锚点2-1', key: 'div6-1' },
                  {
                    text: '锚点2-2',
                    key: 'div6-2',
                  },
                ],
              },
              { text: '锚点3', key: 'div7' },
              { text: '锚点4', key: 'div8' },
            ],
          },
          {
            component: 'Rows',
            items: [
              {
                component: 'AnchorContent',
                key: 'div5',
                attrs: {
                  style: {
                    height: '500px',
                  },
                },
                children: 'div5',
              },
              {
                component: 'AnchorContent',
                key: 'div6',
                attrs: {
                  style: {
                    height: '500px',
                  },
                },
                children: 'div6',
              },
              {
                component: 'AnchorContent',
                key: 'div7',
                attrs: {
                  style: {
                    height: '500px',
                  },
                },
                children: 'div7',
              },
              {
                component: 'AnchorContent',
                key: 'div8',
                attrs: {
                  style: {
                    height: '500px',
                  },
                },
                children: 'div8',
              },
            ],
          },
        ],
      }
    },
  }
})
