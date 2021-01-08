define([], function () {
  return {
    title: '指定标题类型',
    file: 'with-title-level',
    description: '可以指定1-6，分别对应H1-H6',
    demo: function () {
      return {
        component: 'Caption',
        title: '指定标题类型H2',
        subtitle: '子标题',
        titleLevel: 2,
      }
    },
  }
})
