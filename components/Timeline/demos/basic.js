define([], function () {
  return {
    title: '基本用法',
    file: 'basic',
    description: '基本的时间轴',
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
