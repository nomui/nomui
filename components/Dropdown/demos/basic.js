define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'Cols',
        items: [
          {
            component: 'Button',
            text: '普通按钮',
          },
          {
            component: 'Dropdown',
            text: '下拉菜单',
            items: [
              {
                text: '导出Word',
                onClick: () => {},
              },
              {
                text: '导出Word',
                onClick: () => {},
              },
            ],
          },
          {
            component: 'Dropdown',
            text: '分割菜单',
            type: 'primary',
            split: true,
            event: () => {
              console.log('点击左边按钮')
            },
            items: [
              {
                text: '导出Word',
                onClick: () => {},
              },
              {
                text: '导出Word',
                onClick: () => {},
              },
              {
                text: '导出Word',
                onClick: () => {},
              },
            ],
          },
        ],
      }
    },
  }
})
