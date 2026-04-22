define([], function () {
  return {
    title: '显示空信息',
    file: 'showEmpty',
    description: '通过设置 showEmpty 显示空信息。',
    demo: function () {
      return {
        component: 'DataList',
        itemRender: ({ itemData }) => {
          return {
            children: `《${itemData.name}》`,
          }
        },
        showEmpty: {
          size: 'large',
        },
      }
    },
  }
})
