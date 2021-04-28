define([], function () {
  return {
    title: '自定义',
    file: 'simple',
    description: '自定义图片链接、图片大小、描述、附属内容。',
    demo: function () {
      return {
        component: 'Empty',
        image: 'https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg',
        imageStyle: {
          height: '60px',
        },
        description: {
          tag: 'span',
          children: [
            'Customize ',
            {
              tag: 'a',
              attrs: {
                href: '#API',
              },
              children: 'Description',
            },
          ],
        },
        children: {
          component: 'Button',
          type: 'primary',
          text: 'Create Now',
        },
      }
    },
  }
})
