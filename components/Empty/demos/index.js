define(['./basic.js', './simple.js', './custom.js', './no-description.js'], function () {
  return {
    title: 'Empty',
    subtitle: '空状态',
    demos: Array.prototype.slice.call(arguments),
  }
})
