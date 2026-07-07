define([], function () {
  return {
    title: '大数据',
    file: 'larger-data',
    description: '大数据性能测试',
    demo: function () {
      return {
        component: 'DataList',
        data: Array.from({ length: 5000 }).map((item, index) => {
          return {
            name: `用户-${index + 1}`,
            id: index + 1,
          }
        }),
        itemRender: ({ itemData }) => {
          return {
            children: {
              component: 'Avatar',
              text: itemData.name
            }
          }
        }
      }
    },
  }
})
