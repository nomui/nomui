define(['css!./nested-summary'], function () {
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

      const formatNumber = (value) => {
        value = String(value)

        // 移除所有非数字字符（除了小数点）
        const numericValue = value.replace(/[^0-9.]/g, '')

        // 分割整数部分和小数部分
        let [integerPart, decimalPart = ''] = numericValue.split('.')

        // 格式化整数部分，每三位加逗号
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

        // 确保小数部分有两位
        decimalPart = decimalPart.padEnd(2, '0').substring(0, 2)

        // 返回格式化后的金额
        return `￥ ${integerPart}.${decimalPart}`
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
          let value = 0

          // 如果子节点还有子节点，递归计算
          if (child.children && child.children.length > 0) {
            value = calculateTotal(child.children, field)
          } else {
            // 否则获取当前子节点的字段值
            const fieldValue = child[field]

            // 如果字段值是字符串，转换为数字
            if (typeof fieldValue === 'string') {
              value = parseFloat(fieldValue) || 0
            } else if (typeof fieldValue === 'number') {
              value = fieldValue
            } else {
              value = 0 // 其他情况默认为 0
            }
          }

          // 累加值
          return sum + value
        }, 0)
      }

      // 递归更新父级tr数据
      const updateParentTrs = (tr) => {
        tr.update({})
        if (tr.parentNode) {
          updateParentTrs(tr.parentNode)
        }
      }

      return {
        component: 'Grid',
        ref: (c) => {
          grid = c
        },
        classes: {
          'nested-summary-grid': true,
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

            // 递归更新父级tr数据
            updateParentTrs(parentTr)

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
                      color: '#888',
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
              return {
                attrs: {
                  style: {
                    fontWeight: 'bold',
                  },
                },
                children: `共：${total} 件`,
              }
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
                return formatNumber(cellData)
              }
              const total = calculateTotal(rowData.children, 'cost')

              return {
                attrs: {
                  style: {
                    fontWeight: 'bold',
                  },
                },
                children: `共：${formatNumber(total)}元`,
              }
            },
            editRender: ({ cellData }) => {
              return {
                component: 'NumberInput',
                value: cellData,
                formatter: (value) => {
                  // 确保输入是字符串
                  value = String(value)

                  // 移除所有非数字字符（除了小数点）
                  const numericValue = value.replace(/[^0-9.]/g, '')

                  // 分割整数部分和小数部分
                  let [integerPart, decimalPart = ''] = numericValue.split('.')

                  // 格式化整数部分，每三位加逗号
                  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

                  // 确保小数部分有两位
                  decimalPart = decimalPart.padEnd(2, '0').substring(0, 2)

                  // 返回格式化后的金额
                  return `￥ ${integerPart}.${decimalPart}`
                },

                parser: (value) => {
                  // 移除所有非数字字符（除了小数点）
                  const result = value.replace(/[^0-9.]/g, '')

                  // 分割整数部分和小数部分
                  const [integerPart, decimalPart = ''] = result.split('.')

                  // 如果小数部分为空或为 0，则返回整数
                  if (!decimalPart || /^0+$/.test(decimalPart)) {
                    return integerPart // 返回整数部分
                  }

                  // 四舍五入到小数点后两位
                  const roundedValue =
                    Math.round(parseFloat(`${integerPart}.${decimalPart}`) * 100) / 100

                  // 将四舍五入后的值转换为字符串
                  const roundedString = String(roundedValue)

                  // eslint-disable-next-line
                  let [roundedInteger, roundedDecimal = ''] = roundedString.split('.')

                  // 如果小数部分为空，补全为 '00'
                  roundedDecimal = roundedDecimal.padEnd(2, '0').substring(0, 2)

                  // 返回解析后的金额
                  return roundedDecimal ? `${roundedInteger}.${roundedDecimal}` : roundedInteger
                },
              }
            },
          },
        ],
        data: arr2,
      }
    },
  }
})
