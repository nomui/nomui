define([], function () {
  return {
    title: '受控列表',
    file: 'fileList',
    demo: function () {
      return {
        children: {
          component: 'Uploader',
          action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
          onChange({ sender, fileList }) {
            if (fileList.length > 3) {
              sender.update({ fileList: fileList.slice(-3) })
            }
          },
        },
      }
    },
    description:
      '上传列表最大为3个，超过则删除最上面一次记录',
  }
})
