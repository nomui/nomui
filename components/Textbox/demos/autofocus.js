define([], function () {
  return {
    title: '自动获得焦点',
    file: 'autofocus',
    demo: function () {
      return {
        children: {
          component: 'Textbox',
          placeholder: 'auto focus',
          autofocus: true,
        },
      }
    },
  }
})
