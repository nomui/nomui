define([], function () {
  return {
    title: '宽度',
    file: 'width',
    description: '通过 `styles.border` 设置为大小相关的值来显示不同的边框大小。',
    demo: function () {
      const borders = ['1px', '2px', '3px', '4px', '5px']
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
