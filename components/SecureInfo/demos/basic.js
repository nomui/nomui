define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'Cols',
        items: [
          {
            component: 'SecureInfo',
            type: 'mail',
            text: 'snoopdog@dogs.com',
          },
          {
            component: 'SecureInfo',
            type: 'name',
            text: '张小花',
          },
          {
            component: 'SecureInfo',
            type: 'mobile',
            text: '13548612345',
          },
        ],
      }
    },
  }
})
