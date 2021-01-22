define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    description: '',
    demo: function () {
      return {
        children: [
          {
            component: 'Field', label: '我是标签',
            control: { children: '我是内容' }
          },
        ],
      }
    },
  }
})
