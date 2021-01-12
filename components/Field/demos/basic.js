define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        children: [
          {
            component: 'Field',
            label: '标签',
            control: {
              component: 'Textbox',
            },
          },
        ],
      }
    },
  }
})
