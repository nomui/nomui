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
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
          },

          {
            component: 'Upload',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
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
          },
        ],
      }
    },
  }
})
