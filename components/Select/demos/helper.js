define([], function (_, exports) {
  function getData1(len) {
    const arry = []
    for (let index = 0; index < len; index++) {
      const data = {
        text: `我是第${index}条数据`,
        value: index,
      }
      arry.push(data)
    }
    return arry
  }

  exports.getData1 = getData1
})
