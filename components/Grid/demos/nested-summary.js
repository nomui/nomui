define([], function () {
  return {
    title: '多级表格的小计与合计',
    file: 'nested-summary',
    demo: function () {
      const data = [
        {
          id: 1,
          name: '电子产品',
          quantity: 50,
          cost: 10000,
          children: [
            { id: 101, name: '手机', quantity: 20, cost: 4000 },
            { id: 102, name: '笔记本电脑', quantity: 10, cost: 3000 },
            { id: 103, name: '平板电脑', quantity: 10, cost: 2000 },
            { id: 104, name: '耳机', quantity: 5, cost: 500 },
            { id: 105, name: '智能手表', quantity: 5, cost: 500 },
          ],
        },
        {
          id: 2,
          name: '家居用品',
          quantity: 100,
          cost: 5000,
          children: [
            {
              id: 200,
              name: '家具',
              quantity: 60,
              cost: 3000,
              children: [
                { id: 201, name: '沙发', quantity: 10, cost: 2000 },
                { id: 202, name: '床', quantity: 20, cost: 1500 },
                { id: 203, name: '餐桌', quantity: 15, cost: 1000 },
                { id: 204, name: '椅子', quantity: 10, cost: 400 },
                { id: 205, name: '衣柜', quantity: 5, cost: 100 },
              ],
            },
            {
              id: 210,
              name: '装饰',
              quantity: 40,
              cost: 2000,
              children: [
                { id: 211, name: '壁画', quantity: 20, cost: 1000 },
                { id: 212, name: '花瓶', quantity: 10, cost: 600 },
                { id: 213, name: '地毯', quantity: 5, cost: 300 },
                { id: 214, name: '灯具', quantity: 3, cost: 80 },
                { id: 215, name: '窗帘', quantity: 2, cost: 20 },
              ],
            },
          ],
        },
        {
          id: 3,
          name: '食品',
          quantity: 300,
          cost: 6000,
          children: [
            { id: 401, name: '面包', quantity: 100, cost: 2000 },
            { id: 402, name: '牛奶', quantity: 80, cost: 1600 },
            { id: 403, name: '鸡蛋', quantity: 60, cost: 1200 },
            { id: 404, name: '水果', quantity: 40, cost: 800 },
            { id: 405, name: '蔬菜', quantity: 20, cost: 400 },
          ],
        },
      ]

      return {
        component: 'Grid',
        rowCheckable: {
          checkedRowKeys: [5],
          width: 80,
          toolbar: {
            align: 'left', // 工具栏靠左
            placement: 'both', // 工具栏位置 header表头 body表身 both表头+表身
            hover: true,
            render: ({ isHeader, field, row, cellData, rowData, index }) => {
              // isHeader表示当前渲染在表头，此时还会传出当前field

              console.log({ isHeader, field, row, cellData, rowData, index })
              return {
                component: 'Toolbar',
                visibleItems: 0,
                size: 'small',
                type: 'text',
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
              }
            },
          },
        },
        treeConfig: {
          treeNodeColumn: 'name',
          initExpandLevel: -1,
        },
        editable: {
          onlyleaf: true, // 只允许编辑叶子节点
          onCellValueChange: ({ cell, newValue }) => {
            // 修改完成后同步更新自己父节点数据
            const field = cell.props.column.field
            const parentTr = cell.tr.parentNode
            setTimeout(() => {
              const parentData = parentTr.props.data
              const trData = cell.tr.props.data
              parentData.children.forEach((x) => {
                if (x.id === trData.id) {
                  const num = newValue - x[field]
                  x[field] = newValue

                  parentData[field] += num
                }
              })

              parentTr.update({ data: parentData })
            }, 0)
          },
        },
        attrs: {
          style: {
            height: '500px',
          },
        },
        columns: [
          {
            field: 'name',
            title: '类别',
            width: 200,
          },
          {
            field: 'quantity',
            title: '件数',
            cellRender: ({ cellData, row }) => {
              if (row.props.isLeaf) {
                return cellData
              }
              // 高亮父节点背景色
              row.element.style.backgroundColor = 'rgba(0,0,0,.025)'
              return `共：${cellData} 件`
            },
            editRender: ({ cellData }) => {
              return {
                component: 'NumberInput',
                value: cellData,
              }
            },
          },
          {
            field: 'cost',
            title: '价格',
            cellRender: ({ cellData, row }) => {
              if (row.props.isLeaf) {
                return cellData
              }
              return `共：${cellData} 元`
            },
            editRender: ({ cellData }) => {
              return {
                component: 'NumberInput',
                value: cellData,
              }
            },
          },
        ],
        data: data,
      }
    },
  }
})
