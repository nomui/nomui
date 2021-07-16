define([], function () {
  return {
    title: '基本用法',
    file: 'basic',
    description: '通过 `styles.border` 来设置边框的样式。',
    demo: function () {
      const borders = [true, 'top', 'right', 'bottom', 'left']
      return {
        component: 'List',
        gutter: 'lg',
        data: borders,
        itemRender: ({ itemData }) => {
          return {
            tag: 'div',
            styles: {
              border: itemData,
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
