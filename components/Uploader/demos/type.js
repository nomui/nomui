define([], function () {
  return {
    title: '限制上传格式',
    file: 'type',
    demo: function () {
      return {
        children: {
          component: 'Uploader',
          action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
          accept: 'image/*',
          onRemove: {
            action: () => {
              return true
            },
          },
        },
      }
    },
    description:
      '限制上传格式，会对上传内容格式进行处理',
  }
})
