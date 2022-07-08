define([], function () {
  return {
    title: '带图标',
    file: 'with-icon',
    description:
      '通过prefix, suffix配置前后缀文案; leftIcon, rightIcon配置左右图标。`Icon优先级更高`',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'small',
        rows: [
          {
            component: 'Textbox',
            leftIcon: 'user',
            placeholder: '左图标',
            prefix: '前缀字符',
          },
          {
            component: 'Textbox',
            placeholder: '前缀字符',
            prefix: '我是一个',
          },
          {
            component: 'Textbox',
            rightIcon: 'check-circle',
            placeholder: '右图标',
          },
          {
            component: 'Textbox',
            placeholder: '后缀文案',
            suffix: '.com',
          },
          {
            component: 'Textbox',
            prefix: '￥',
            leftIcon: 'left',
            rightIcon: 'right',
            suffix: '.com',
            placeholder: '左右图标',
          },
          {
            component: 'Textbox',
            placeholder: '左右字符',
            prefix: '￥',
            suffix: 'RMB',
          },
          {
            component: 'Textbox',
            prefix: '￥',
            rightIcon: 'right',
            placeholder: '混合使用',
          },
        ],
      }
    },
  }
})
