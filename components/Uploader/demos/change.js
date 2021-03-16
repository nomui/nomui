define([], function () {
  return {
    title: '监控文件上传状态',
    file: 'basic',
    demo: function () {
      function getMsg(status, filename) {
        switch (status) {
          case 'done':
            return `${filename} 文件上传成功`
          case 'error':
            return `${filename} 文件上传失败`
          case 'removed':
            return `${filename} 文件被删除`
          default:
            return ''
        }
      }
      return {
        children: {
          component: 'Uploader',
          action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
          onChange: function ({ file, fileList }) {
            if (file.status !== 'uploading') {
              console.log(getMsg(file.status, file.name))
            }

            let successCount = 0
            let failCount = 0
            fileList.forEach(({ status }) => {
              if (status === 'done') {
                successCount++
              } else if (status === 'error') {
                failCount++
              }
            })

            if (successCount + failCount === fileList.length) {
              // eslint-disable-next-line
              console.log(`文件上传完毕，上传成功${successCount}个,失败${failCount}个`)
            }
          },
        },
      }
    },
  }
})
