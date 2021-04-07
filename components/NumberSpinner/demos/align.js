define([], function () {
  return {
    title: 'Align',
    file: 'alignment',
    demo: function () {
      return {
        component: 'Rows',
        items: [
          {
            component: 'NumberSpinner',
            label: '右边排列',
            // 默认为right，也可以不写
            align: 'right',
            // showSpinner: false,
            value: 100,
          },
          {
            component: 'NumberSpinner',
            label: '左边排列',
            // 默认为right，也可以不写
            align: 'left',
            // showSpinner: false,
            value: 100,
          },
          {
            component: 'NumberSpinner',
            label: '两边排列',
            // 默认为right，也可以不写
            align: 'horizontal',
            // showSpinner: false,
            value: 100,
          },
          {
            component: 'NumberSpinner',
            label: '不显示',
            // 默认为right，也可以不写
            showSpinner: false,
            // showSpinner: false,
            value: 100,
          },
        ],
      }
    },
  }
})
