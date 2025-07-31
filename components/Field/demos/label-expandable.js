define([], function () {
  return {
    title: '标签可展开',
    file: 'label-expandable',
    description: '',
    demo: function () {
      return {
        children: [
          {
            component: 'Field',
            label: '我是标签',
            labelAlign: 'top',
            labelExpandable: {
              expanded: false,
            }, // 标签可展开
            control: { children: '我是内容' },
            action: [{ component: 'Button', text: '我是操作' }],
          },
        ],
      }
    },
  }
})
