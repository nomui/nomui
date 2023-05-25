define([], function () {
  return {
    title: '菜单类型',
    file: 'item-type',
    demo: function () {
      const items = [
        { text: 'MenuItem', id: 'menuItem', type: 'menu-item' },
        { text: 'Divider', id: 'divider', type: 'divider' },
        {
          text: 'SubMenu',
          id: 'submenu',
          type: 'submenu',
          items: [
            { text: 'Sub1', id: 'sub1' },
            {
              text: 'Sub2',
              id: 'sub2',
              items: [
                {
                  text: 'GroupA',
                  type: 'group',
                  id: 'Sub2GroupA',
                  items: [
                    { text: 'GroupSub1', id: 'GroupSub1' },

                    { text: 'GroupSub2', id: 'GroupSub2' },
                  ],
                },
                {
                  text: 'GroupB',
                  type: 'group',
                  id: 'Sub2GroupB',
                  items: [
                    { text: 'GroupSub1', id: 'GroupSub1' },

                    { text: 'GroupSub2', id: 'GroupSub2' },
                  ],
                },
              ],
            },
          ],
        },
        {
          text: 'Group',
          type: 'group',
          id: 'group',
          items: [
            { text: 'GroupSub1', id: 'GroupSub1' },

            { text: 'GroupSub2', id: 'GroupSub2' },
          ],
        },
        { text: 'MenuItem2', id: 'menuItem2', type: 'menu-item' },
        { text: 'Divider', id: 'divider2', type: 'divider', dashed: true },
        { text: 'MenuItem3', id: 'menuItem3', type: 'menu-item' },
      ]

      return {
        component: 'Flex',
        rows: [
          {
            component: 'Menu',

            // direction: 'horizontal',

            items: items,
          },
        ],
      }
    },
  }
})
