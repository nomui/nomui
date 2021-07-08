define([], function () {
  return {
    title: '基本用法',
    file: 'basic',
    description: '通过 `selectable` 配置组件的可选中行为',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'medium',
        rows: [
          {
            component: 'Button',
            selectable: {
              byClick: true,
              canRevert: true,
              selectedProps: {
                text: '点击取消选中',
              },
              unselectedProps: {
                text: '点击选中我',
              },
            },
          },
        ],
      }
    },
  }
})
