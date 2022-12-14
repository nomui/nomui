define([], function () {
  return {
    title: '列表显示方式',
    file: 'display',
    demo: function () {
      return {
        children: {
          component: 'Uploader',
          display: 'replace',
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
      '上传列表显示模式，display为replace时，则列表展示最后一次上传文件',

  }
})
