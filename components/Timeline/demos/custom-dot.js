define([], function () {
  return {
    title: '自定义时间轴点',
    file: 'custom-dot',
    description: '可以设置为图标或其他自定义元素。',
    demo: function () {
      return {
        component: 'Timeline',
        items: [
          {
            children: 'Create a services site 2015-09-01',
          },
          {
            children: 'Solve initial network problems 2015-09-01',
          },
          {
            dot: {
              component: 'Icon',
              type: 'github',
            },
            children: 'Technical testing 2015-09-01',
          },
          {
            children: 'Network problems being solved 2015-09-01',
          },
        ],
      }
    },
  }
})
