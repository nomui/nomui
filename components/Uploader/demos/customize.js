define([], function () {
  return {
    title: '自定义详情',
    file: 'basic',
    demo: function () {
      return {
        children: {
          component: 'Uploader',
          action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
          customizeInfo: (file) => {
            if (!file || !file.response) return null
            const {
              response: { name },
            } = file

            return [
              {
                tag: 'span',
                children: {
                  tag: 'a',
                  children: name,
                  classes: {
                    'upload-file-name': true,
                  },
                },
              },
              {
                tag: 'span',
                children: '12.37KB',
              },
              {
                tag: 'span',
                children: `更新日期 : 2021-05-11`,
                classes: {
                  'upload-file-update': true,
                  'u-border-left ': true,
                },
              },
              {
                tag: 'span',
                children: `版本号: 0505`,
                classes: {
                  'upload-file-update': true,
                  'u-border-left ': true,
                },
              },
            ]
          },
        },
      }
    },
  }
})
