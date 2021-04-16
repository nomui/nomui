define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'Cols',
        items: [
          {
            component: 'MaskInfo',
            type: 'mail',
            text: 'snoopdog@dogs.com',
          },
          {
            component: 'MaskInfo',
            type: 'name',
            text: '张小花',
          },
          {
            component: 'MaskInfo',
            type: 'mobile',
            text: '13548612345',
          },
        ],
      }
    },
  }
})
