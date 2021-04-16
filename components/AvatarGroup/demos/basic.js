define([], function () {
  return {
    title: '基础用法',
    file: 'group',
    description: '简单的头像组展示',
    demo: function () {
      return {
        component: 'AvatarGroup',
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
