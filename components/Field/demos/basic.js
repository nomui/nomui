define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    description: '',
    demo: function () {
      return {
        children: [
          {
            component: 'Field', component: 'Field', label: '我是标签',
            content: '我是内容'
          },
        ],
      }
    },
  }
})
