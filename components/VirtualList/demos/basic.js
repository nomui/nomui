define([], function () {
  const getData = function (len) {
    const arry = []
    for (let index = 0; index < len; index++) {
      const data = {
        component: 'Caption',
        title: '老铁们双击666，✈️🚀走一波',
        subtitle: `我是第${index}条数据`,
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
        listData: getData(10000), // 列表数据源arry
        height: 300, // 容器高度默认400
        size: 40, // 每个列表项高度预估值，默认值30
        bufferScale: 1, // 缓冲区比例默认1
      }
    },
  }
})
