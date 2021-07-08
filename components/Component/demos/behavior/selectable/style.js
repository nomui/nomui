define([], function () {
  return {
    title: '选中样式',
    file: 'style',
    description: '通过 `styles.selected` 配置组件选中的样式',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'medium',
        rows: [
          {
            component: 'Button',
            text: '选我选我',
            selectable: {
              byClick: true,
              canRevert: true,
            },
            styles: {
              selected: {
                color: 'primary',
              },
            },
          },
        ],
      }
    },
  }
})
