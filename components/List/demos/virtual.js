define(['./helper.js'], function (helper) {
  return {
    title: '列表开启虚拟渲染',
    file: 'virtual',
    demo: function () {
      let list_ref = null
      return {
        children: [
          {
            component: 'List',
            itemSelectable: {
              byClick: true,
            },
            gutter: 'md',
            line: 'split',
            cols: 1,
            items: helper.getData1(10000),
            virtual: true,
            onItemSelectionChange({ sender }) {
              console.log(sender)
            },
          },
          {
            component: 'Divider',
          },
          {
            component: 'List',
            ref: (c) => {
              list_ref = c
            },
            itemSelectable: {
              byClick: true,
            },
            gutter: 'md',
            line: 'split',
            cols: 1,
            showEmpty: true,
            onItemSelectionChange({ sender }) {
              console.log(sender)
            },
          },
          {
            component: 'Divider',
          },
          {
            component: 'Flex',
            gap: 'medium',
            cols: [
              {
                component: 'Button',
                text: '点我普通List更新为虚拟列表',
                onClick: () => {
                  list_ref.update({ items: helper.getData1(10000), virtual: true })
                },
              },
              {
                component: 'Button',
                text: '点我虚拟列表更新为普通List',
                onClick: () => {
                  list_ref.update({ items: helper.getData1(40), virtual: false })
                },
              },
            ],
          },
        ],
      }
    },
  }
})
