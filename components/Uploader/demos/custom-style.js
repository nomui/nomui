define([], function () {
  return {
    title: '自定义上传按钮样式',
    file: 'custom-style',
    demo: function () {
      return {
        children: {
          component: 'Uploader',
          accept: 'image/*',
          action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
          button: {
            component: 'Flex',
            styles: {
              border: [true, 'dashed'],
              padding: '2',
            },
            attrs: {
              style: {
                cursor: 'pointer',
              },
            },
            align: 'center',
            rows: [
              {
                children: {
                  component: 'Icon',
                  type: 'cloud-upload',
                  attrs: {
                    style: {
                      'font-size': '2.5rem',
                      color: 'var(--nom-color-primary)',
                    },
                  },
                },
              },
              {
                children: '点击上传',
                attrs: {
                  style: {
                    'font-weight': 'bold',
                  },
                },
              },
              {
                children: '支持的文件类型：pdf、doc、xls等文件，且大小不超过10M',
                attrs: {
                  style: {
                    'font-size': '12px',
                    color: 'rgba(28, 31, 35, 0.6)',
                  },
                },
              },
            ],
          },
          extraAction: [
            {
              text: '预览',
              action: ({ file }) => {
                const { originFile } = file
                if (originFile && originFile instanceof File) {
                  const src = URL.createObjectURL(originFile)
                  window.open(src)
                }
              },
            },
          ],
        },
      }
    },
    description:
      '把文件拖入指定区域，完成上传，同样支持点击上传。',

  }
})
