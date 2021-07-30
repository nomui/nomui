define([], function () {
  return {
    title: '清除',
    file: 'allowClear',
    description: '支持允许或者禁用清除。',
    demo: function () {
      return {
        component: 'Rows',
        items: [
          {
            component: 'Cols',
            items: [
              {
                component: 'Rate',
                value: 3,
              },
              { children: 'allowClear: true' },
            ],
          },
          {
            component: 'Cols',
            items: [
              {
                component: 'Rate',
                allowClear: false,
                value: 3,
              },
              { children: 'allowClear: false' },
            ],
          },
        ],
      }
    },
  }
})
