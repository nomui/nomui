define([], function () {
  return {
    title: '基本用法',
    file: 'basic',
    description:
      '通过 `style.color` 配置组件的背景色及前景色（文本颜色）；`style.hover.color` 配置鼠标悬浮颜色；`style.selected.color` 配置选中状态颜色',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'large',
        rows: [
          {
            children: {
              styles: {
                color: 'lblue',
                padding: 1,
              },
              children: 'I am lblue',
            },
          },
          {
            children: {
              styles: {
                color: 'lblue',
                padding: 1,
                hover: {
                  color: 'blue',
                },
              },
              children: 'I am lblue, hover on me to change to blue',
            },
          },
          {
            children: {
              styles: {
                color: 'lblue',
                padding: 1,
                selected: {
                  color: 'blue',
                },
              },
              selectable: {
                byClick: true,
                canRevert: true,
              },
              children: 'I am lblue, select me to change to light blue',
            },
          },
        ],
      }
    },
  }
})
