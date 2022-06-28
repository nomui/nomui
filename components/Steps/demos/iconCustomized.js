define([], function () {
  return {
    title: '完全自定义步骤图标',
    file: 'iconCustomized',
    demo: function () {
      return {
        children: {
          component: 'Steps',
          current: 1,
          options: [
            {
              iconCustomized: true,
              icon: {
                component: 'Progress',
                type: 'circle',
                width: 60,
                percent: 50,
              },
            },
            {
              iconCustomized: true,
              icon: {
                component: 'Progress',
                percent: 50,
                steps: 10,
              },
            },
            {
              iconCustomized: true,
              icon: {
                component: 'Progress',
                percent: 50,
                status: 'active',
              },
            },
          ],
        },
      }
    },
  }
})
