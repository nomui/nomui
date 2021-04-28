define([], function () {
  return {
    title: '简约模式',
    file: 'simple',
    description: '可以通过设置 image 为 `nomui.Empty.PRESENTED_IMAGE_SIMPLE` 选择另一种风格的图片',
    demo: function () {
      return {
        component: 'Empty',
        image: nomui.Empty.PRESENTED_IMAGE_SIMPLE,
      }
    },
  }
})
