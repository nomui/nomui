define([], function () {
  return {
    title: '点击事件',
    file: 'onChange',
    demo: function () {
      let stepsRef = null
      return {
        children: {
          component: 'Steps',
          ref: (c) => {
            stepsRef = c
          },
          current: 1,
          onChange: (current) => {
            stepsRef.update({ current })
          },
          options: [
            {
              title: 'Finished',
              description: 'This is description',
            },
            {
              title: 'In Progress',
              subTitle: 'subTitle',
              description: 'This is description',
            },
            {
              title: 'Waiting',
              description: 'This is description',
            },
          ],
        },
      }
    },
  }
})
