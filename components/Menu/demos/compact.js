define([], function () {
  return {
    title: '紧凑模式',
    file: 'compact',
    demo: function () {
      const items = [
        { icon: 'clock', text: '基本信息', id: 'css' },
        {
          icon: 'calendar',
          text: '项目管理',
          id: 'css',
          items: [
            { text: '起步', id: 'css' },
            {
              text: '样式',
              id: 'css',
              items: [
                { text: '起步', id: 'css' },
                { text: '样式', id: 'css' },
              ],
            },
          ],
        },

        { icon: 'table', text: '组织管理', id: 'components' },
        { icon: 'profile', text: '系统设置', id: 'javascript' },
      ]

      return {
        component: 'Rows',
        items: [
          {
            component: 'Menu',
            attrs: {
              style: {
                width: '80px',
              },
            },
            direction: 'vertical',
            compact: true,
            itemSelectable: {
              byClick: true,
            },
            items: items,
          },
        ],
      }
    },
  }
})
