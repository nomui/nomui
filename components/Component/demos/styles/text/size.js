define([], function () {
  return {
    title: '大小',
    file: 'size',
    description: '通过 `styles.text` 设置为大小相关的值来控制文本的大小',
    demo: function () {
      const sizes = ['large', 'small', '1d25x', '1d5x', '1d75x', '2x', '3x', '4x', '5x']
      return {
        component: 'List',
        cols: 1,
        data: sizes,
        itemRender: ({ itemData }) => {
          return {
            styles: {
              text: itemData,
            },
            children: `这是一段 ${itemData} 大小的文本`,
          }
        },
      }
    },
  }
})
