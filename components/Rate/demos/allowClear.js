define([], function () {
  return {
    title: '清除',
    file: 'allowClear',
    description: '支持允许或者禁用清除。',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'small',
        rows: [
          {
            component: 'Flex',
            align: 'center',
            gap: 'small',
            cols: [
              {
                component: 'Rate',
                value: 3,
              },
              { children: 'allowClear: true' },
            ],
          },
          {
            component: 'Flex',
            gap: 'small',
            align: 'center',
            cols: [
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
