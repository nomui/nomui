define([], function () {
    return {
      title: '菜单类型',
      file: 'item-type',
      demo: function () {

  
        const items = [
          { text: '起步', id: 'css' },
          {
            text: '样式',
            id: 'css',
            items: [
              { text: '起步', id: 'css' },
              {
                text: '样式',
                id: 'css',
                items: [
                  { text: '起步', id: 'css' },
                  { text: '样式', id: 'css' },
                ],
              },
            ],
          },
  
          { text: '组件', id: 'components' },
          { text: '单页应用', id: 'javascript' },
        ]
  
        return {
          component: 'Flex',
          rows: [
           
            {
              component: 'Menu',

              direction: 'horizontal',
              itemSelectable: {
                byClick: true,
              },
              items: items,
            },
            
          ],
        }
      },
    }
  })
  