define([], function () {
  return {
    title: '圆角/方角边缘',
    subtitle: '通过设定 strokeLinecap="square|round" 可以调整进度条边缘的形状。',
    file: 'stroke-linecap',
    demo: function () {
      return {
        children: [
          {
            component: 'Rows',
            items: [
              {
                component: 'Progress',
                strokeLinecap: 'square',
                percent: 75,
              },
              {
                component: 'Progress',
                strokeLinecap: 'round',
                percent: 75,
              },
              {
                component: 'Cols',
                items: [
                  {
                    component: 'Progress',
                    type: 'circle',
                    strokeLinecap: 'square',
                    percent: 75,
                  },
                  {
                    component: 'Progress',
                    type: 'dashboard',
                    strokeLinecap: 'square',
                    percent: 75,
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
