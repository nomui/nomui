define([], function () {
  return {
    title: '自定义格式化显示',
    file: 'format',
    demo: function () {
      const deadline = new Date().getTime() + 3 * 24 * 60 * 60 * 1000
      return {
        component: 'List',
        cols: 2,
        items: [
          {
            component: 'Countdown',
            title: '倒计时',
            value: deadline,
            interval: 1000,
            format: 'D天H小时m分s秒',
          },
          {
            component: 'Countdown',
            title: '倒计时',
            value: deadline,
            interval: 50,
            format: 'HH:mm:ss:SSS',
          },
        ],
      }
    },
  }
})
