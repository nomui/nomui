define([], function () {
  return {
    title: '自定义图标',
    file: 'icon',
    demo: function () {
      return {
        children: {
          component: 'Steps',
          current: 1,
          options: [
            {
              title: 'Finished',
              description: 'This is description',
              icon: 'user',
            },
            {
              title: 'In Progress',
              subTitle: 'subTitle',
              description: 'This is description',
              icon: 'profile',
            },
            {
              title: 'Waiting',
              description: 'This is description',
              icon: {
                component: 'icon',
                type: 'close',
              },
            },
          ],
        },
      }
    },
  }
})
