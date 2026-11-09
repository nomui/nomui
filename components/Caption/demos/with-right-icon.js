define([], function () {
  return {
    title: '带右侧图标',
    file: 'with-right-icon',
    demo: function () {
      return {
        component: 'Caption',
        title: '带右侧图标的标题',
        subtitle: '子标题',
        rightIcon: 'github',
      }
    },
  }
})
