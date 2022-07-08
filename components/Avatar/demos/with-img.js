define([], function () {
  return {
    title: '带图片',
    description: '使用img图片，优先级高于icon',
    file: 'with-image',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'small',
        cols: [
          {
            component: 'Avatar',
            text: '小马',
            src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            size: 'xsmall',
          },
          {
            component: 'Avatar',
            text: '小马',
            styles: {
              shape: 'square',
            },
            src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          },
          {
            component: 'Avatar',
            text: '小马',
            src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            size: 'xlarge',
          },
        ],
      }
    },
  }
})
