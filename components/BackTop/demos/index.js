define(['./body.js', './basic.js', './more.js'], function () {
  return {
    title: 'BackTop',
    subtitle: '返回顶部',
    demos: Array.prototype.slice.call(arguments),
  }
})
