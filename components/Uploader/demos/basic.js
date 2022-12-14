define([], function () {
  return {
    title: '基本用法',
    file: 'basic',
    demo: function () {
      return {
        children: {
          component: 'Uploader',
          action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
          onRemove: {
            action: () => {
              return true
            },
          },
        },
      }
    },
    description:
      '经典款式，用户点击按钮弹出文件选择框。',

  }
})
