define([], function () {
  return {
    title: '指定尺寸',
    file: 'group',
    description: '通过size设置尺寸',
    demo: function () {
      return {
        component: 'AvatarGroup',
        size: 'lg',
        items: [
          {
            text: '安其拉',
          },
          {
            text: '马克波罗',
          },
          {
            text: '后裔',
          },
          {
            text: '亚瑟',
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
