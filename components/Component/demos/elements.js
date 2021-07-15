define([], function () {
  return {
    title: '各种元素',
    file: 'basic',
    description: '通过给组件配置不同的属性，可以渲染各种 `html` 元素',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'large',
        rows: [
          {
            tag: 'p',
            children: '文本',
          },
          {
            tag: 'input',
            attrs: {
              type: 'button',
              value: '按钮',
            },
          },
          {
            tag: 'button',
            attrs: {
              type: 'button',
            },
            children: '另一种按钮',
          },
          {
            tag: 'input',
            attrs: {
              type: 'text',
              placeholder: '文本框',
            },
          },
          {
            tag: 'input',
            attrs: {
              type: 'radio',
            },
          },
          {
            tag: 'input',
            attrs: {
              type: 'checkbox',
            },
          },
        ],
      }
    },
  }
})
