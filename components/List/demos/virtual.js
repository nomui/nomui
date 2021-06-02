define(['./helper.js'], function (helper) {
  return {
    title: '列表开启虚拟渲染',
    file: 'virtual',
    demo: function () {
      return {
        component: 'List',
        itemSelectable: {
          byClick: true,
        },
        gutter: 'md',
        line: 'split',
        cols: 1,
        onItemSelectionChange({ sender }) {
          console.log(sender)
        },
        virtual: true,
        items: helper.getData1(10000),
      }
    },
  }
})
