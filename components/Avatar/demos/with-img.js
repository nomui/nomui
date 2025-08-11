define([], function () {
  return {
    title: '带图片',
    description:
      '使用img图片，优先级高于icon,src可以传入一个字符串，也可以传入字符串数组，根据优先级取第一个能访问的图片',
    file: 'with-img',
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
            icon: 'user',
            text: '小马',
            src: [
              'https://pic2.zhimg.com/80/v2-0fb7738fb1c8ed2e4c0782a8344fa9b1_r.jpg',
              'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            ],
            size: 'xlarge',
          },
        ],
      }
    },
  }
})
