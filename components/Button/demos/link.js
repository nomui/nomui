define([], function () {
  return {
    title: '链接按钮',
    file: 'link',
    demo: function () {
      return {
        component: 'Flex',
        rows: [
          {
            component: 'Button',
            text: '链接到图标示例',
            href: '#!components!index?type=Icon',
          },
        ],
      }
    },
  }
})
