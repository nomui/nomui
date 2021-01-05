define([], function () {
  return {
    title: '交替展现',
    file: 'mode-alternate',
    description: '内容在时间轴两侧轮流出现。',
    demo: function () {
      return {
        component: 'Timeline',
        mode: 'alternate',
        items: [
          {
            children: 'Create a services site 2015-09-01',
          },
          {
            color: 'green',
            children: 'Solve initial network problems 2015-09-01',
          },
          {
            dot: {
              attrs: {
                style: {
                  'font-size': '16px',
                },
              },
              component: 'Icon',
              type: 'question-circle',
            },
            children: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
            beatae vitae dicta sunt explicabo.`,
          },
          {
            color: 'red',
            children: 'Network problems being solved 2015-09-01',
          },
          {
            children: 'Create a services site 2015-09-01',
          },
          {
            dot: {
              component: 'Icon',
              type: 'check-circle',
            },
            children: 'Technical testing 2015-09-01',
          },
        ],
      }
    },
  }
})
