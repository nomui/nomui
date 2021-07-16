define([], function () {
  return {
    title: '颜色',
    file: 'color',
    description: '通过 `styles.text` 设置为颜色相关的值来控制文本的颜色',
    demo: function () {
      const colors = [
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
      ]
      return {
        component: 'List',
        cols: 1,
        data: colors,
        itemRender: ({ itemData }) => {
          return {
            styles: {
              text: itemData,
            },
            children: `这是一段 ${itemData} 颜色的文本`,
          }
        },
      }
    },
  }
})
