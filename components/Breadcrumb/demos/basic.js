define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'Breadcrumb',
        items: [
          {
            text: 'Home',
            rightIcon: 'profile',
            overlay: [
              { text: '起步起步', url: '#!components!index?type=component' },
              {
                text: '组件',
                items: [
                  { text: '级联选择', id: 'cascader', url: '#!components!index?type=Cascader' },
                  {
                    text: '浮层',
                    id: 'drawer',
                    items: [{ text: 'drawer', url: '#!components!index?type=Drawer' }],
                  },
                ],
              },
            ],
          },
          { text: 'Uploader', icon: 'upload', url: '#!components!index?type=Uploader' },
        ],
      }
    },
  }
})
