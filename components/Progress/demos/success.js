define([], function () {
  return {
    title: '分段进度条',
    description: '通过`success`配置分段颜色',
    file: 'success',
    demo: function () {
      return {
        children: [
          {
            component: 'Flex',
            gap: 'small',
            rows: [
              {
                component: 'Progress',
                percent: 60,
                success: {
                  percent: 30,
                },
              },
              {
                component: 'Cols',
                items: [
                  {
                    component: 'Progress',
                    type: 'circle',
                    percent: 60,
                    success: {
                      percent: 30,
                    },
                  },
                  {
                    component: 'Progress',
                    type: 'dashboard',
                    percent: 60,
                    success: {
                      percent: 30,
                    },
                  },
                ],
              },
            ],
          },
        ],
      }
    },
  }
})
