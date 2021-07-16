define([], function () {
  return {
    title: '其他',
    file: 'other',
    description: '其他设置。',
    demo: function () {
      const borders = ['none', 'transparent', 'dashed']
      return {
        component: 'List',
        gutter: 'lg',
        data: borders,
        itemRender: ({ itemData }) => {
          return {
            tag: 'div',
            styles: {
              border: [true, itemData],
              color: 'lgray',
              padding: '3',
            },
            children: `${itemData}`,
          }
        },
      }
    },
  }
})
