define([], function () {
  // const getData = function (len) {
  //   const arry = []
  //   const dataObj = {
  //     component: 'Caption',
  //     title: '标题',
  //     subtitle: '子标题换行显示',
  //     subtitleWrap: true,
  //     icon: {
  //       type: 'github',
  //       styles: {
  //         text: '3',
  //       },
  //     },
  //   }
  //   for (let index = 0; index < len; index++) {
  //     dataObj.title = `我是第${index}条`
  //     arry.push(dataObj)
  //   }
  //   return arry
  // }
  const getData = function () {
    const data = []
    for (let i = 0; i < 100; i++) {
      data.push({ value: i })
    }

    return data
  }
  console.log(getData())
  return {
    title: '基本用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'VirtualList',
        dataSource: getData(), // 列表数据源
      }
    },
  }
})
