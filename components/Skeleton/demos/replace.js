define([], function () {
  return {
    title: '替换结构',
    file: 'replace',
    demo: function () {
      return {
        children: [
          {
            tag: 'p',
            styles: {
              text: 'orange',
            },
            children:
              '有的界面比较复杂，可以在父容器用Flex+Skeleton结合的方式搭建相对精确的骨架屏，在异步数据返回成功时直接替换父容器的结构',
          },
          {
            onCreated: ({ inst }) => {
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve({ url: 'https://www.wetrial.com/Assets/img/f0b.jpg' })
                }, 3000)
              }).then((data) => {
                inst.update({
                  children: {
                    tag: 'img',
                    attrs: {
                      src: data.url,
                    },
                  },
                })
              })
            },

            children: {
              component: 'Flex',
              gutter: 'large',
              justify: 'center',
              attrs: {
                style: {
                  width: '800px',
                  textAlign: 'center',
                },
              },
              rows: [
                {
                  children: {
                    component: 'Skeleton',
                    type: 'title',
                    width: 400,
                  },
                },
                {
                  component: 'Skeleton',
                  type: 'image',
                  width: 600,
                  height: 300,
                },
                {
                  component: 'Skeleton',
                  type: 'paragraph',
                  paragraph: 20,
                },
              ],
            },
          },
        ],
      }
    },
  }
})
