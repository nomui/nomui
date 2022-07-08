define([], function () {
  return {
    title: '进度圈',
    subtitle: '圈形的进度',
    file: 'circle',
    demo: function () {
      return {
        children: [
          {
            component: 'Flex',
            gap: 'small',
            cols: [
              {
                component: 'Progress',
                type: 'circle',
                percent: 75,
              },
              {
                component: 'Progress',
                type: 'circle',
                percent: 75,
                status: 'exception',
              },
              {
                component: 'Progress',
                type: 'circle',
                percent: 100,
              },
            ],
          },
        ],
      }
    },
  }
})
