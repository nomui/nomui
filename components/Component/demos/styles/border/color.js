define([], function () {
  return {
    title: '颜色',
    file: 'color',
    description: '通过 `styles.border` 设置为颜色相关的值来显示不同的边框颜色。',
    demo: function () {
      const borderColors = [
        'red',
        'orange',
        'yellow',
        'green',
        'teal',
        'blue',
        'indigo',
        'purple',
        'pink',
        'cyan',
        'brown',
        'gray',
        'light',
        'dark',
      ]
      return {
        component: 'List',
        gutter: 'lg',
        data: borderColors,
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
