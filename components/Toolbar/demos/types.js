define([], function () {
  return {
    title: '类型',
    file: 'types',
    demo: function () {
      return {
        component: 'Rows',
        items: [
          {
            component: 'Toolbar',
            type: 'dashed',
            items: [
              {
                text: '按钮1',
              },
              {
                text: '按钮2',
              },
              {
                text: '按钮3',
              },
              {
                text: '按钮4',
              },
            ],
          },
          {
            component: 'Toolbar',
            type: 'link',
            items: [
              {
                text: '按钮1',
              },
              {
                text: '按钮2',
              },
              {
                text: '按钮3',
              },
              {
                text: '按钮4',
              },
            ],
          },
          {
            component: 'Toolbar',
            type: 'text',
            items: [
              {
                text: '按钮1',
              },
              {
                text: '按钮2',
              },
              {
                text: '按钮3',
              },
              {
                text: '按钮4',
              },
            ],
          },
        ],
      }
    },
  }
})
