define([], function () {
  return {
    title: '限制数量',
    file: 'group',
    description: '带最大限制数',
    demo: function () {
      return {
        component: 'AvatarGroup',
        size: 'xl',
        maxCount: 2,
        items: [
          {
            text: '安其拉',
            src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          },
          {
            text: '马克波罗',
          },
          {
            text: '后裔',
          },
          {
            text: '典韦',
            tooltip: '可以打野，可以战士',
          },
          {
            text: '李白',
          },
          {
            text: '宫本武藏',
          },
        ],
        itemDefaults: {
          attrs: {
            style: {
              color: '#f56a00',
              backgroundColor: '#fde3cf',
            },
          },
        },
      }
    },
  }
})
