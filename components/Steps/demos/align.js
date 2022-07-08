define([], function () {
  return {
    title: '布局方式',
    file: 'align',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'small',
        rows: [
          {
            component: 'StaticText',
            value: '水平布局',
          },
          {
            component: 'Steps',
            direction: 'horizontal',
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
          {
            component: 'StaticText',
            value: '垂直布局',
          },
          {
            component: 'Steps',
            direction: 'vertical',
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
        ],
      }
    },
  }
})
