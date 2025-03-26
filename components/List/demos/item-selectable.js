define([], function () {
  return {
    title: '数据项可选择',
    file: 'item-selectable',
    description:
      '通过 itemSelectable 配置数据项的可选择行为，配合 itemRender 返回的 props 的 styles 设置选中的样式。',
    demo: function () {
      let listRef = null

      return {
        component: 'Flex',
        gap: 'large',
        rows: [
          {
            align: 'center',
            gap: 'large',
            cols: [
              {
                component: 'RadioList',
                uistyle: 'button',
                value: 'single',
                options: [
                  { text: '单选', value: 'single' },
                  { text: '多选', value: 'multiple' },
                ],
                onValueChange: ({ newValue }) => {
                  listRef.update({ itemSelectable: { multiple: newValue === 'multiple' } })
                },
              },
              {
                component: 'Button',
                text: '选择天龙八部',
                onClick: () => {
                  listRef.selectItem(4)
                },
              },
              {
                component: 'Button',
                text: '获取选中数据',
                onClick: () => {
                  const selectedDataStr = JSON.stringify(listRef.getSelectedData(), null, 2)
                  new nomui.Message({
                    content: `选中数据：${selectedDataStr}`,
                    type: 'info',
                    duration: 3,
                  })
                },
              },
            ],
          },
          {
            component: 'List',
            ref: (c) => {
              listRef = c
              window.lll = c
            },
            gutter: 'lg',

            itemSelectable: {
              byClick: true,
            },

            dataFields: { key: 'id' },
            onRendered: () => {
              listRef.selectItem(1)
            },
            data: [
              { name: '飞狐外传', id: 1 },
              { name: '雪山飞狐', id: 2 },
              { name: '连城诀', id: 3 },
              { name: '天龙八部', id: 4 },
              { name: '射雕英雄传', id: 5 },
              { name: '白马啸西风', id: 6 },
              { name: '鹿鼎记', id: 7 },
            ],
            itemRender: ({ itemData }) => {
              return {
                styles: {
                  color: 'lgray',
                  padding: '2',
                  cursor: 'pointer',
                  hover: {
                    color: 'lprimary-light',
                  },
                  selected: {
                    color: 'lprimary',
                  },
                },
                children: `《${itemData.name}》`,
              }
            },
          },
        ],
      }
    },
  }
})
