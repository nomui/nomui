define([], function () {
  return {
    title: '基本用法',
    file: 'basic',
    demo: function () {
      let stepsRef = null
      return {
        children: {
          component: 'Steps',
          ref: (c) => {
            stepsRef = c
          },
          current: 1,
          direction: 'vertical',
          onChange: (current) => {
            stepsRef.update({ current })
          },
          options: [
            {
              title: 'Finished',
              description: 'This is description',
              // icon: 'user',
              // status: 'finish',
            },
            {
              title: 'In Progress',
              subTitle: 'subTitle',
              description: 'This is description',
              // status: 'process',
            },
            {
              title: 'Waiting',
              description: 'This is description',
              // status: 'wait',
            },
            {
              title: 'Error',
              description: 'This is description',
              status: 'error',
            },
          ],
        },
      }
    },
  }
})
