define([], function () {
  let allfail = null,
    pending = null,
    someFail = null

  return {
    title: '更多例子（设置了备用图片时）',
    file: 'more',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'medium',
        rows: [
          {
            component: 'Button',
            text: '全部加载失败',
            onClick: () => {
              allfail.update({
                autoRender: true,
              })
            },
          },
          {
            component: 'Image',
            ref: (c) => {
              allfail = c
            },
            autoRender: false,
            src: [
              'https://v2-0fb7738fb1c8ed2e4c.jpg',
              'https://v2-66b950756852a81cbfb89617c6.jpg',
              'https://v2-46bcf5ceb1c4ee767b2b53.jpg',
              'https://v2-c9b1cd29bbd3230fe30b9.jpg',
              'https://v2-c5897fc79dc05e6109_r.jpg',
            ],
          },
          {
            component: 'Button',
            text: '部分图片加载失败',
            onClick: () => {
              pending.update({
                autoRender: true,
              })
            },
          },
          {
            component: 'Image',
            ref: (c) => {
              pending = c
            },
            autoRender: false,
            width: 400,
            src: [
              'https://zh782a8344fa9b1_r.jpg',
              'https://0756852a81cbfb89617c6bb52fa_r.jpg',
              'https://767b2b53c152532f4b_r.jpg',
              'https://co30fe30b9ef078a3de4e_r.jpg',
              'https://pic1.zhimg.com/80/v2-c589a8fd036cf547de7fc79dc05e6109_r.jpg',
            ],
          },
          {
            component: 'Button',
            text: '加载中（需要切慢网速看）',
            onClick: () => {
              someFail.update({
                autoRender: true,
              })
            },
          },
          {
            component: 'Image',
            ref: (c) => {
              someFail = c
            },
            autoRender: false,
            width: 400,
            src: 'https://pic1.zhimg.com/80/v2-46bcf5ceb1c4ee767b2b53c152532f4b_r.jpg',
          },
        ],
      }
    },
  }
})
