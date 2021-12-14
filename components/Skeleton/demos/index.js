define(['./basic.js', './custom.js', './repeat.js', './replace.js'], function () {
  return {
    title: 'Skeleton',
    subtitle: '骨架屏',
    demos: Array.prototype.slice.call(arguments),
  }
})
