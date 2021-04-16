define([], function () {
  const gaps = [4, 3, 2, 1]
  const names = ['凯', '钟馗', '蔡文姬', '安其拉', '马可波罗']
  return {
    title: '自动调整字符大小',
    description:
      '对于字符型的头像，当字符串较长时，字体大小可以根据头像宽度自动调整。也可使用 gap 来设置字符距离左右两侧边界单位像素',
    file: 'change-gap',
    demo: function () {
      let userAvatar = null

      return {
        component: 'Cols',
        items: [
          {
            component: 'Avatar',
            ref: (c) => {
              userAvatar = c
            },
            size: 'xlarge',
            text: '小马',
          },
          {
            component: 'Button',
            text: '换英雄',
            onClick: () => {
              const index = Math.ceil(Math.random() * 100) % names.length
              userAvatar.update({
                text: names[index],
              })
            },
          },
          {
            component: 'Button',
            text: '修改间距',
            onClick: () => {
              const index = Math.ceil(Math.random() * 100) % gaps.length
              userAvatar.update({
                gap: gaps[index],
              })
            },
          },
        ],
      }
    },
  }
})
