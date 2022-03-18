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
            attrs: {
              style: {
                color: '#fff',
                backgroundColor: '#748ffc',
              },
            },
          },
          {
            text: '后裔',
            attrs: {
              style: {
                color: '#fff',
                backgroundColor: '#4dabf7',
              },
            },
          },
          {
            text: '典韦',
            tooltip: '可以打野，可以战士',
            attrs: {
              style: {
                color: '#fff',
                backgroundColor: '#66d9e8',
              },
            },
          },
          {
            text: '李白',
            attrs: {
              style: {
                color: '#fff',
                backgroundColor: '#63e6be',
              },
            },
          },
          {
            text: '宫本武藏',
            attrs: {
              style: {
                color: '#fff',
                backgroundColor: '#c0eb75',
              },
            },
          },
        ],
        itemDefaults: {
          attrs: {
            style: {
              color: '#fff',
              backgroundColor: '#faa2c1',
            },
          },
        },
      }
    },
  }
})
