define([], function () {
  return {
    title: '排列',
    file: 'alignment',
    demo: function () {
      return {
        component: 'Rows',
        items: [
          {
            component: 'NumberSpinner',
            label: '右图标',
            // 默认为right，也可以不写
            align: 'right',
            value: 100,
          },
          {
            component: 'NumberSpinner',
            label: '左图标',
            align: 'left',
            value: 100,
          },
          {
            component: 'NumberSpinner',
            label: '两端图标',
            align: 'horizontal',
            value: 100,
          },
          {
            component: 'NumberSpinner',
            label: '不显示图标',
            showSpinner: false,
            value: 100,
          },
        ],
      }
    },
  }
})
