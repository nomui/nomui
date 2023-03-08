define([], function () {
  return {
    title: '紧凑模式',
    file: 'compact',
    demo: function () {
      const items = [
        { icon: 'clock', text: '基本信息', id: 'basic' },
        {
          icon: 'calendar',
          text: '项目管理',
          id: 'css',
          items: [
            { text: '起步', id: 'css1' },
            {
              text: '样式',
              id: 'css',
              items: [
                { text: '起步', id: 'css2' },
                { text: '样式', id: 'css3' },
              ],
            },
          ],
        },

        {
          icon: 'table',
          text: '组织管理',

          id: 'components',
        },
        {
          icon: 'profile',
          text: '系统设置',
          id: 'javascript',
          items: [
            { text: '起步', id: 'javascript1' },
            {
              text: '样式',
              id: 'javascript2',
              items: [
                { text: '起步', id: 'javascript3' },
                { text: '样式', id: 'javascript4' },
              ],
            },
          ],
        },
      ]

      return {
        component: 'Flex',
        rows: [
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
            keyField: 'id',
            itemDefaults: {
              key: function () {
                return this.props.id
              },
            },
          },
        ],
      }
    },
  }
})
