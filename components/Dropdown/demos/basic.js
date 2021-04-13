define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'Cols',
        items: [
          {
            component: 'Dropdown',
            text: '下拉菜单',
          },
        ],
      }
    },
  }
})
