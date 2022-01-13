define([], function () {
  return {
    title: '自定义进度条渐变色',
    description: 'linear-gradient 的封装。推荐只传两种颜色',
    file: 'linear-gradient',
    demo: function () {
      return {
        children: [
          {
            component: 'Rows',
            items: [
              {
                component: 'Progress',
                percent: 99.9,
                strokeColor: {
                  '0%': '#108ee9',
                  '100%': '#87d068',
                },
              },
              {
                component: 'Cols',
                items: [
                  {
                    component: 'Progress',
                    type: 'circle',
                    percent: 90,
                    strokeColor: {
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    },
                  },
                  {
                    component: 'Progress',
                    type: 'dashboard',
                    percent: 90,
                    strokeColor: {
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    },
                  },
                  {
                    component: 'Progress',
                    type: 'circle',
                    percent: 100,
                    strokeColor: {
                      '0%': '#108ee9',
                      '100%': '#87d068',
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
