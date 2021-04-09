define([], function () {
  return {
    title: '步骤进度条',
    subtitle: '带步骤的进度条',
    file: 'steps',
    demo: function () {
      return {
        children: [
          {
            component: 'Rows',
            items: [
              {
                component: 'Progress',
                percent: 50,
                steps: 10,
              },
              {
                component: 'Progress',
                percent: 30,
                steps: 10,
              },
              {
                component: 'Progress',
                percent: 30,
                steps: 10,
                size: 'small',
                strokeColor: '#52c41a',
              },
            ],
          },
        ],
      }
    },
  }
})
