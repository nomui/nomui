define(['./helper.js'], function (helper) {
  return {
    title: '开启虚拟渲染功能',
    file: 'basic',
    demo: function () {
      return {
        component: 'List',
        items: helper.getData1(10),
      }
    },
  }
})
