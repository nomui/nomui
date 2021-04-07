define([], function () {
  return {
    title: '分段进度条',
    subtitle: '通过success配置分段颜色',
    file: 'success',
    demo: function () {
      return {
        children: [
          {
            component: 'Rows',
            items: [
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
