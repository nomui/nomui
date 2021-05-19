define(['./helper.js'], function (helper) {
  return {
    title: '基本用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'VirtualList',
        listData: helper.getData1(10000),
        height: 300,
        size: 40,
        bufferScale: 1,
      }
    },
  }
})
