define([], function () {
  return {
    title: '指定标题级别',
    file: 'with-title-level',
    description: '可以指定 `titleLevel` 1-6，分别对应 H1-H6',
    demo: function () {
      return {
        component: 'Caption',
        title: '指定标题级别 H2',
        subtitle: '子标题',
        titleLevel: 2,
      }
    },
  }
})
