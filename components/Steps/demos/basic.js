define([], function () {
  return {
    title: '基本用法',
    file: 'basic',
    demo: function () {
      return {
        children: {
          component: 'Steps',
          current: 1,
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
    description:
      '简单的步骤条',
  }
})
