define([], function () {
  return {
    title: '刷新间隔',
    file: 'interval',
    demo: function () {
      return {
        component: 'Countdown',
        title: '倒计时',
        value: new Date().getTime() + 60 * 1000,
        interval: 2000,
      }
    },
  }
})
