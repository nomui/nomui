define(['./helper.js'], function (helper) {
  return {
    title: '列表开启虚拟渲染',
    file: 'virtual',
    demo: function () {
      return {
        children: [
          {
            component: 'List',
            itemSelectable: {
              byClick: true,
            },
            virtual: true,
            gutter: 'md',
            line: 'split',
            cols: 1,
            data: helper.getData1(10000),
            showEmpty: true,
            itemRender: ({ itemData }) => {
              return {
                style: {
                  selected: {
                    color: 'lprimary',
                  },
                },
                children: `${itemData.title}`
              }
            },
            onItemSelectionChange({ sender }) {
              console.log(sender)
            },
          },
        ],
      }
    },
  }
})
