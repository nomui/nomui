define([], function () {
  return {
    title: '基本用法',
    file: 'basic',
    demo: function () {
      return {
        children: [
          {
            component: 'Rows',
            items: [
              {
                component: 'Progress',
                percent: 30,
              },
              {
                component: 'Progress',
                percent: 50,
                status: 'active',
              },
              {
                component: 'Progress',
                percent: 70,
                status: 'exception',
              },
              {
                component: 'Progress',
                percent: 100,
              },
              {
                component: 'Progress',
                percent: 50,
                showInfo: false,
              },
            ],
          },
        ],
      }
    },
  }
})
