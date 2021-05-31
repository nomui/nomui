define(['./helper.js'], function (helper) {
  return {
    title: '开启虚拟渲染功能的列表',
    file: 'basic',
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
