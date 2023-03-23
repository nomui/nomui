define([], function () {
  return {
    title: '自定义上传界面',
    file: 'custom',
    demo: function () {
      return {
        component: 'Flex',
        align: 'center',
        gutter: 'large',
        rows: [
          {
            component: 'UploaderCore',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            multiple: true,
            dragger: {
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
                  children: '拖拽至此区域上传',
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
          },
        ],
      }
    },
  }
})
