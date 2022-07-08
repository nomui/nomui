define([], function () {
  return {
    title: '状态',
    file: 'basic',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'small',
        rows: [
          {
            component: 'StaticText',
            value: `指定current,通过设置current属性，确认options各子项的状态。
                option索引项小于current的状态为finish，等于的为process,大于的为wait`,
          },
          {
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
          {
            component: 'StaticText',
            value: `虽然指定了current，但如果既指定了current，又指定了status。
                则status会覆盖current`,
          },
          {
            component: 'Steps',
            current: 2,
            options: [
              {
                title: 'Finished',
                description: 'This is description',
                status: 'finish',
              },
              {
                title: 'In Progress',
                subTitle: 'subTitle',
                description: 'This is description',
                status: 'process',
              },
              {
                title: 'Waiting',
                description: 'This is description',
                status: 'wait',
              },
              {
                title: 'Error',
                description: 'This is description',
                status: 'error',
              },
            ],
          },
        ],
      }
    },
  }
})
