define([], function () {
  return {
    title: '不同尺寸',
    file: 'size',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'small',
        cols: [
          {
            component: 'Switch',
            text: 'xsmall',
            size: 'xsmall',
          },
          {
            component: 'Switch',
            text: 'small',
            size: 'small',
          },
          {
            component: 'Switch',
            text: 'default',
            size: 'medium',
          },
          {
            component: 'Switch',
            text: 'large',
            size: 'large',
          },
          {
            component: 'Switch',
            text: 'xlarge',
            size: 'xlarge',
          },
        ],
      }
    },

    description:
      'size 表示小号开关的属性。',
  }
})
