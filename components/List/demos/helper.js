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
        title: `NomUI Title ${index}`,
        subtitle:
          '实现滚动加载无限长列表，带有虚拟化（virtualization）功能，能够提高数据量大时候长列表的性能',
        subtitleWrap: true,
        icon: {
          type: 'star',
          styles: {
            text: '2',
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
        title: `NomUI Title ${index}`,
        subtitle:
          '实现滚动加载无限长列表，带有虚拟化（virtualization）功能，能够提高数据量大时候长列表的性能',
        subtitleWrap: true,
        icon: {
          type: 'star',
          styles: {
            text: '2',
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
  exports.getData1 = getData1
  exports.getData2 = getData2
})
