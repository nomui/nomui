define([], function () {
  let stepsRef = null
  return {
    title: '完全自定义步骤图标',
    file: 'iconRender',
    demo: function () {
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
              title: 'In Progress',
              description: 'This is description',
              iconRender: () => {
                return {
                  component: 'Progress',
                  type: 'circle',
                  width: 60,
                  percent: 50,
                }
              },
            },
            {
              title: 'In Progress',
              description: 'This is description',
              iconRender: () => {
                return {
                  component: 'Progress',
                  percent: 50,
                  steps: 10,
                }
              },
            },
            {
              title: 'In Progress',
              description: 'This is description',
              iconRender: () => {
                return {
                  component: 'Progress',
                  percent: 50,
                  status: 'active',
                }
              },
            },
          ],
        },
      }
    },
  }
})
