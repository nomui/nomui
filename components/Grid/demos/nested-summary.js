define([], function () {
  return {
    title: '多级表格的小计与合计',
    file: 'nested-summary',
    demo: function () {
      let grid = null

      const arr2 = [
        {
          id: 1,
          name: '电子产品',
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
          name: '家居软装',
          children: [
            { id: 21, name: '开荒清洁', quantity: 2, cost: 1200 },
            { id: 22, name: '封窗', quantity: 1, cost: 22000 },
            {
              id: 200,
              name: '家具',
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
          children: [
            { id: 401, name: '面包', quantity: 100, cost: 2000 },
            { id: 402, name: '牛奶', quantity: 80, cost: 1600 },
            { id: 403, name: '鸡蛋', quantity: 60, cost: 1200 },
            { id: 404, name: '水果', quantity: 40, cost: 800 },
            { id: 405, name: '蔬菜', quantity: 20, cost: 400 },
          ],
        },
      ]

      const levelBg = {
        0: 'rgba(0,0,0,.075)',
        1: 'rgba(0,0,0,.025)',
        2: 'rgba(0,0,0,.005)',
      }
      // 根据单元格值更新整个data
      const updateDataByCell = ({ source, id, field, newValue }) => {
        // 递归更新函数
        const updateRecursive = (items) => {
          for (const item of items) {
            if (item.id === id) {
              item[field] = newValue
              return true
            }

            if (item.children && item.children.length > 0) {
              const isUpdated = updateRecursive(item.children)
              if (isUpdated) {
                return true
              }
            }
          }
          return false
        }

        // 调用递归函数
        const isUpdated = updateRecursive(source)

        // 如果未找到目标节点，抛出错误
        if (!isUpdated) {
          throw new Error(`未找到 id 为 ${id} 的节点`)
        }

        return source
      }

      // 递归计算某个字段的合计
      const calculateTotal = (children, field) => {
        return children.reduce((sum, child) => {
          if (child.children && child.children.length > 0) {
            return sum + calculateTotal(child.children, field)
          }
          return sum + (child[field] || 0)
        }, 0)
      }

      return {
        component: 'Grid',
        ref: (c) => {
          window.grid = c
          grid = c
        },
        // rowCheckable: {
        //   checkedRowKeys: [5],
        //   width: 80,
        //   toolbar: {
        //     align: 'left', // 工具栏靠左
        //     placement: 'both', // 工具栏位置 header表头 body表身 both表头+表身
        //     hover: true,
        //     render: () => {
        //       return {
        //         component: 'Toolbar',
        //         visibleItems: 0,
        //         size: 'small',
        //         type: 'text',
        //         items: [
        //           {
        //             text: '导出Word',
        //             onClick: () => {},
        //           },
        //         ],
        //       }
        //     },
        //   },
        // },
        treeConfig: {
          treeNodeColumn: 'name',
          initExpandLevel: -1,
        },
        summary: {
          text: '合计',
          method: ({ columns, data }) => {
            const res = {}
            columns.forEach((col) => {
              if (col.field === 'nom-grid-row-checker') {
                res[col.field] = ''
              } else {
                // 统计表格内所有该字段值的合计
                const total = calculateTotal(data, col.field)
                res[col.field] = total
              }
            })
            return res
          },
        },
        editable: {
          onlyleaf: true, // 只允许编辑叶子节点
          onCellValueChange: ({ cell, newValue, sender }) => {
            // 当前tr数据
            const field = cell.props.column.field
            const trData = cell.tr.props.data
            // 父级tr数据
            const parentTr = cell.tr.parentNode
            const parentData = parentTr.props.data

            // 更新Grid数据
            updateDataByCell({
              source: grid.props.data,
              id: trData.id,
              field,
              newValue,
              targetId: parentData.id,
            })

            parentTr.update({})
            if (parentTr.parentNode) {
              parentTr.parentNode.update({})
            }

            sender.updateSummary()
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
            cellRender: ({ cellData, row }) => {
              if (row.props.isLeaf) {
                return {
                  attrs: {
                    style: {
                      color: '#555',
                    },
                  },
                  children: cellData,
                }
              }
              return {
                attrs: {
                  style: {
                    fontWeight: 'bold',
                  },
                },
                children: cellData,
              }
            },
          },
          {
            field: 'quantity',
            title: '件数',
            cellRender: ({ cellData, row, rowData }) => {
              if (row.props.isLeaf) {
                return cellData
              }

              // 高亮父节点背景色
              row.element.style.backgroundColor = levelBg[row.props.level]
              const total = calculateTotal(rowData.children, 'quantity')
              return `共：${total} 件`
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
            cellRender: ({ cellData, row, rowData }) => {
              if (row.props.isLeaf) {
                return cellData
              }
              const total = calculateTotal(rowData.children, 'cost')
              return `共：${total} 元`
            },
            editRender: ({ cellData }) => {
              return {
                component: 'NumberInput',
                value: cellData,
              }
            },
          },
        ],
        data: arr2,
      }
    },
  }
})
