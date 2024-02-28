define(['./basic.js', './skip.js', './align.js', './render.js'], function () {
  return {
    title: 'Tour',
    subtitle: '漫游式引导',
    demos: Array.prototype.slice.call(arguments),
  }
})
