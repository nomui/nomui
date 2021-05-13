define([], function () {
  const getData = function (len) {
    const arry = []
    for (let index = 0; index < len; index++) {
      const data = {
        component: 'Caption',
        title: `标题${index}`,
        subtitle: '子标题换行显示',
        subtitleWrap: true,
        icon: {
          type: 'github',
          styles: {
            text: '3',
          },
        },
      }
      arry.push(data)
    }
    return arry
  }
  return {
    title: '基本用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'VirtualList',
        dataSource: getData(100), // 列表数据源arry
        clientHeight: 500, // 可视区高度默认200px
        size: 80, // 每个列表项高度预估值，默认值30
      }
    },
  }
})
