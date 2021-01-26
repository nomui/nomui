define([], function () {
  return {
    title: '不显示眼睛，用tooltip提示',
    file: 'tooltip',
    demo: function () {
      return {
        component: 'Cols',
        items: [
          {
            component: 'MaskInfo',
            type: 'mail',
            text: 'snoopdog@dogs.com',
            icon: false,
          },
          {
            component: 'MaskInfo',
            type: 'name',
            text: '张小花',
            icon: false,
          },
          {
            component: 'MaskInfo',
            type: 'mobile',
            text: '13548612345',
            icon: false,
          },
        ],
      }
    },
  }
})
