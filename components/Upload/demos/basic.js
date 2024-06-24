define([], function () {
  return {
    title: '基本用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'Flex',
        align: 'center',
        gutter: 'large',
        rows: [
          {
            component: 'Upload',
            action: 'https://run.mocky.io/v3/74f2f759-ff23-48e0-a3c9-44c62a57842c',
            onChange: ({ file, fileList, failedFileList, status }) => {
              // file:当前文件   
              // fileList:已上传文件数组   
              // failedFileList: 上传失败的文件数组
              // status: done表示所有文件上传完毕，pending表示还在进行状态
              console.log(file, fileList, failedFileList, status)

            },
          },

          {
            component: 'Upload',
            action: 'https://run.mocky.io/v3/0185b1e1-2c72-49f8-986c-a3ad33cf6ad6',
            multiple: true,
            draggable: true,

            trigger: {
              styles: {
                padding: 5,
                border: true,
                color: 'lgray',
              },
              children: '拖拽至此区域上传',
            },
            onChange: ({ fileList }) => {

              if (fileList[0] && fileList[0].status === 'done' || fileList[0] && fileList[0].status === 'done') {
                alert(1)
              }

            }

          },
        ],
      }
    },
  }
})
