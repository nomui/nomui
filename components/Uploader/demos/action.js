define([], function () {
  return {
    title: '操作事件',
    file: 'action',
    demo: function () {
      return {
        children: {
          component: 'Uploader',
          action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
          onRemove: {
            text: '移除',
            action: (event, file) => {
              // eslint-disable-next-line
              console.log(event, file)
              return new Promise((resolve) =>
                setTimeout(function () {
                  resolve(true)
                }, 3000),
              )
            },
          },
          allowUpdate: true, // 支持文件更新
        },
      }
    },
  }
})
