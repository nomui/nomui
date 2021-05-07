define([], function () {
  return {
    title: '倒计时完成时的回调',
    file: 'onComplete',
    demo: function () {
      return {
        component: 'Countdown',
        title: '倒计时',
        value: new Date().getTime() + 12 * 1000,
        interval: 1000,
        onComplete: () => {
          new nomui.Message({ type: 'info', content: 'Mission complete!' })
        },
      }
    },
  }
})
