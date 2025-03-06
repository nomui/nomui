define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'small',
        cols: [
          {
            component: 'Button',
            text: '普通按钮',
          },
          {
            component: 'Dropdown',
            text: '下拉菜单',
            triggerAction: 'hover',
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
            onClick: () => {
              console.log('点击左边按钮')
            },
            items: [
              {
                text: '导出Word',
                onClick: () => {
                  console.log('点击下拉按钮')
                },
              },
              {
                text: '导出Word',
                onClick: () => {
                  console.log('点击下拉按钮')
                },
              },
              {
                text: '导出Word',
                onClick: () => {
                  console.log('点击下拉按钮')
                },
              },
            ],
          },
          {
            component: 'Dropdown',
            text: '分组',
            split: true,
            onClick: () => {
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
                component: 'Divider',
              },
              {
                text: '导出Word',
                onClick: () => {},
              },
            ],
          },

          {
            component: 'Dropdown',
            text: '尺寸与图标',
            rightIcon: 'ellipsis',
            split: true,
            size: 'small',
            onClick: () => {
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
