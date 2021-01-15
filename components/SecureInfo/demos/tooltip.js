define([], function () {
  return {
    title: '不显示眼睛，用tooltip提示',
    file: 'tooltip',
    demo: function () {
      return {
        component: 'Cols',
        items: [
          {
            component: 'SecureInfo',
            type: 'mail',
            text: 'snoopdog@dogs.com',
            icon: false,
          },
          {
            component: 'SecureInfo',
            type: 'name',
            text: '张小花',
            icon: false,
          },
          {
            component: 'SecureInfo',
            type: 'mobile',
            text: '13548612345',
            icon: false,
          },
        ],
      }
    },
  }
})
