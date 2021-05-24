define(['./helper.js'], function (helper) {
  return {
    title: '虚拟滚动列表中使用',
    file: 'more',
    demo: function () {
      return {
        component: 'VirtualList',
        listData: helper.getData1(10000),
        height: 300,
        size: 40,
        bufferScale: 1,
        backtop: {
          duration: 1000,
          animations: 'Bounce.easeOut',
          target: 'nom-virtual-list-container',
          height: 100000,
          right: 50,
          bottom: 50,
          text: '返回顶端',
          onClick: () => {},
        },
      }
    },
  }
})
