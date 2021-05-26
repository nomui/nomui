define([], function (_, exports) {
  function randomNum(minNum, maxNum) {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1, 10)

      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)

      default:
        return 0
    }
  }
  function getData1(len) {
    const arry = []
    for (let index = 0; index < len; index++) {
      const data = {
        component: 'Caption',
        title: `${index}`,
        subtitle: '老铁们双击666，✈️🚀走一波~',
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

  function getData2(len) {
    const arry = []
    for (let index = 0; index < len; index++) {
      const data1 = {
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
      const data2 = {
        component: 'Layout',
        header: {
          children: '我是头部',
        },
        body: {
          children: '我是身体',
        },
        footer: {
          children: '我是脚部',
        },
      }
      const data3 = {
        component: 'Group',
        fields: [
          {
            component: 'Textbox',
            label: 'xsmall',
            controlWidth: 'xsmall',
          },
          {
            component: 'Textbox',
            label: 'small',
            controlWidth: 'small',
          },
          {
            component: 'Textbox',
            label: 'medium',
            controlWidth: 'medium',
          },
          {
            component: 'Textbox',
            label: 'large',
            controlWidth: 'large',
          },
          {
            component: 'Textbox',
            label: 'xlarge',
            controlWidth: 'xlarge',
          },
        ],
      }
      const num = randomNum(1, 3)
      switch (num) {
        case 1:
          arry.push(data1)
          break
        case 2:
          arry.push(data2)
          break
        default:
          arry.push(data3)
          break
      }
    }
    return arry
  }
  function getData3(len) {
    const arry = []
    for (let index = 0; index < len; index++) {
      const data = {
        children: '新年快乐~',
      }
      arry.push(data)
    }
    return arry
  }
  exports.getData1 = getData1
  exports.getData2 = getData2
  exports.getData3 = getData3
})
