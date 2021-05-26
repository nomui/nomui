define(['./helper.js'], function (helper) {
  return {
    title: '同时支持内容多样化',
    file: 'more',
    demo: function () {
      return {
        component: 'VirtualList',
        listData: helper.getData2(10000),
        height: 400,
      }
    },
  }
})
