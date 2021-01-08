define([], function () {
  return {
    title: '图片上传',
    file: 'picture',
    demo: function () {
      return {
        children: {
          component: 'Uploader',
          accept: 'image/*',
          action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
          button: {
            component: 'Button',
            icon: 'upload',
            text: '上传图片',
          },
          onPreview(file) {
            const { originFile } = file
            if (originFile && originFile instanceof Blob) {
              const src = URL.createObjectURL(originFile)
              window.open(src)
            }
          },
        },
      }
    },
  }
})
