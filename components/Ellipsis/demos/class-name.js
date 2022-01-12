define([], function () {
  return {
    title: '直接使用类名',
    file: 'class-name',
    description: '可以直接在需要 单行文本... 省略的地方加上 .nom-ellipsis-block 的类名',
    demo: function () {
      return {
        tag: 'div',
        attrs: { style: 'width: 200px' },
        children: '直接tag标签使用 直接tag标签使用 直接tag标签使用 直接tag标签使用',
        classes: { 'nom-ellipsis-block': true },
      }
    },
  }
})
