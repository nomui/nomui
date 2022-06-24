define(['./basic.js', './more.js'], function () {
  return {
    title: 'Image',
    subtitle: '图片',
    demos: Array.prototype.slice.call(arguments),
  }
})
