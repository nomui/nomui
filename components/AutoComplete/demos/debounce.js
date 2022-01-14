define([], function () {
  return {
    title: '防抖',
    file: 'debounce',
    demo: function () {
      const options = Array.from({ length: 20 }, (_, k) => ({ value: 'a'.repeat(k) }))
      return {
        component: 'Rows',
        items: [
          {
            component: 'AutoComplete',
            label: '关闭防抖',
            options,
            debounce: false,
            onSearch(txt) {
              // 关闭防抖后
              // eslint-disable-next-line
              console.log(txt)
            },
          },
          {
            component: 'AutoComplete',
            label: '开启防抖',
            options,
            // 防抖默认是开启的，这个默认不写也行
            debounce: true,
            // 设定防抖的时间间隔
            interval: 600,
            onSearch(txt) {
              // 开启防抖后,并指定每600毫秒响应一次search事件
              // eslint-disable-next-line
              console.log(txt)
            },
          },
        ],
      }
    },
  }
})
