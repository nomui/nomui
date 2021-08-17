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
  }
})
