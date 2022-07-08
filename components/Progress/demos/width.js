define([], function () {
  return {
    title: '小型进度圈',
    description: '小一号的圈形进度',
    file: 'width',
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
                width: 80,
                percent: 75,
              },
              {
                component: 'Progress',
                type: 'circle',
                percent: 75,
                width: 80,
                status: 'exception',
              },
              {
                component: 'Progress',
                type: 'circle',
                width: 80,
                percent: 100,
              },
            ],
          },
        ],
      }
    },
  }
})
