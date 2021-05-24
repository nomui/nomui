define(['./helper.js'], function (helper) {
  return {
    title: '开启虚拟渲染功能',
    file: 'basic',
    demo: function () {
      return {
        component: 'List',
        itemSelectable: {
          byClick: true,
        },
        onItemSelectionChange({ sender }) {
          console.log(sender)
        },
        virtualSupport: {
          open: true,
          height: 300,
          size: 40,
          bufferScale: 1,
        },
        items: helper.getData1(10000),
      }
    },
  }
})
