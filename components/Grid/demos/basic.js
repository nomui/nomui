define(['css!./style.css'], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      const data = [
        {
          id: 1,
          title: '工时名称1',
          dates: [
            {
              date: '2023-10-02', // Monday
              hours: 4,
            },
            {
              date: '2023-10-03', // Tuesday
              hours: 1,
            },
            {
              date: '2023-10-04', // Wednesday
              hours: 0,
            },
            {
              date: '2023-10-05', // Thursday
              hours: 2,
            },
            {
              date: '2023-10-06', // Friday
              hours: 3,
            },
            {
              date: '2023-10-07', // Saturday
              hours: 0,
            },
            {
              date: '2023-10-08', // Sunday
              hours: 0,
            },
          ],
          description: '这是工时名称1的描述信息',
          totolHour: 18,
        },
        {
          id: 2,
          title: '工时名称2',
          dates: [
            {
              date: '2023-10-02',
              hours: 3,
            },
            {
              date: '2023-10-03',
              hours: 4,
              approved: true,
            },
            {
              date: '2023-10-04',
              hours: 3,
            },
            {
              date: '2023-10-05',
              hours: 4,
            },
            {
              date: '2023-10-06',
              hours: 3,
            },
            {
              date: '2023-10-07',
              hours: 0,
            },
            {
              date: '2023-10-08',
              hours: 0,
            },
          ],
          description: '这是工时名称2的描述信息',
          totolHour: 17,
        },
        {
          id: 3,
          title: '工时名称3',
          dates: [
            {
              date: '2023-10-02',
              hours: 3,
              approved: true,
            },
            {
              date: '2023-10-03',
              hours: 3,
            },
            {
              date: '2023-10-04',
              hours: 3,
            },
            {
              date: '2023-10-05',
              hours: 3,
            },
            {
              date: '2023-10-06',
              hours: 3,
            },
            {
              date: '2023-10-07',
              hours: 0,
            },
            {
              date: '2023-10-08',
              hours: 0,
            },
          ],
          description: null,
          totolHour: 15,
        },
      ]

      const renderHour = ({ hours, approved }) => {
        const colorMap = {
          1: '#E8F5E9', // Very light green (50)
          2: '#C8E6C9', // Light green (100)
          3: '#81C784', // Medium green (300)
          4: '#4CAF50', // Normal green (500)
          5: '#FF9800', // Orange warning color
        }

        if (hours === null || hours === undefined) {
          return '-'
        }

        // Determine color index based on hours
        let colorIndex
        if (hours === 0) {
          return '-' // Treat 0 hours as empty
        }
        if (hours <= 2) {
          colorIndex = 1
        } else if (hours <= 4) {
          colorIndex = 2
        } else if (hours <= 6) {
          colorIndex = 3
        } else if (hours <= 8) {
          colorIndex = 4
        } else {
          colorIndex = 5 // Warning color for >8 hours
        }

        return {
          classes: {
            'wt-work-hour-grid-hour': true,
            'wt-work-hour-grid-hour-approved': approved,
          },
          attrs: {
            style: {
              backgroundColor: colorMap[colorIndex],
            },
          },
          children: [
            {
              children: hours,
            },
            {
              component: 'Icon',
              type: 'check',
            },
          ],
        }
      }

      const columns = [
        {
          field: 'title',
          title: '任务名称',
          width: 200,
        },
        {
          field: 'day1',
          title: '10月1日',
          width: 120,
          align: 'center',
          cellRender: ({ rowData }) => {
            return renderHour(rowData.dates[0])
          },
          editRender: ({ rowData }) => {
            return {
              component: 'NumberInput',
              step: 0.5,
              value: rowData.dates[0].hours,
            }
          },
        },
        {
          field: 'day2',
          title: '10月2日',
          width: 120,
          align: 'center',
          cellRender: ({ rowData }) => {
            return renderHour(rowData.dates[1])
          },
          editRender: ({ rowData }) => {
            return {
              component: 'NumberInput',
              step: 0.5,
              value: rowData.dates[1].hours,
            }
          },
        },
        {
          field: 'day3',
          title: '10月3日',
          width: 120,
          align: 'center',
          cellRender: ({ rowData }) => {
            return renderHour(rowData.dates[2])
          },
          editRender: ({ rowData }) => {
            return {
              component: 'NumberInput',
              step: 0.5,
              value: rowData.dates[2].hours,
            }
          },
        },
        {
          field: 'day4',
          title: '10月4日',
          width: 120,
          align: 'center',
          cellRender: ({ rowData }) => {
            return renderHour(rowData.dates[3])
          },
          editRender: ({ rowData }) => {
            return {
              component: 'NumberInput',
              step: 0.5,
              value: rowData.dates[3].hours,
            }
          },
        },
        {
          field: 'day5',
          title: '10月5日',
          width: 120,
          align: 'center',
          cellRender: ({ rowData }) => {
            return renderHour(rowData.dates[4])
          },
          editRender: ({ rowData }) => {
            return {
              component: 'NumberInput',
              step: 0.5,
              value: rowData.dates[4].hours,
            }
          },
        },
        {
          field: 'day6',
          title: '10月6日',
          width: 120,
          align: 'center',
          cellRender: ({ rowData }) => {
            return renderHour(rowData.dates[5])
          },
          editRender: ({ rowData }) => {
            return {
              component: 'NumberInput',
              step: 0.5,
              value: rowData.dates[5].hours,
            }
          },
        },
        {
          field: 'day7',
          title: '10月7日',
          width: 120,
          align: 'center',
          cellRender: ({ rowData }) => {
            return renderHour(rowData.dates[6])
          },
          editRender: ({ rowData }) => {
            return {
              component: 'NumberInput',
              step: 0.5,
              value: rowData.dates[6].hours,
            }
          },
        },
        {
          field: 'description',
          title: '备注',
          cellRender: ({ cellData }) => {
            return cellData || '-'
          },
          editRender: ({ cellData }) => {
            return {
              component: 'MultilineTextbox',
              value: cellData,
              placeholder: '请输入描述信息',
            }
          },
        },
        {
          field: 'totolHour',
          title: '总工时',
          align: 'center',
          width: 120,
          cellRender: ({ cellData }) => {
            return `#${cellData || 0}<span style="color:#999; margin-left:2px"> h</span>`
          },
        },
      ]

      const calculateTotal = (dataArr, field) => {
        const index = field.replace('day', '') - 1 // day1 -> 0, day2 -> 1, ...

        return dataArr.reduce((sum, item) => {
          const dateData = item.dates[index]
          if (dateData && dateData.hours) {
            return sum + dateData.hours
          }
          return sum
        }, 0)
      }
      return {
        component: 'Layout',
        header: {
          children: {
            component: 'Flex',
            align: 'center',
            cols: [
              {
                align: 'center',
                cols: [
                  {
                    component: 'Button',
                    icon: 'left',
                    size: 'small',
                    type: 'text',
                  },
                  {
                    component: 'DatePicker',
                    weekMode: true,
                    controlWidth: 210,
                    weekFormat: `{start} 至 {end}`,
                    value: '2025-05-26',
                    variant: 'borderless',
                    allowClear: false,
                  },
                  {
                    component: 'Button',
                    icon: 'right',
                    size: 'small',
                    type: 'text',
                  },
                ],
              },
              {
                grow: true,
                children: '',
              },
              {
                component: 'Button',
                type: 'primary',
                text: '新建工时',
                icon: 'plus',
                size: 'small',
              },
            ],
          },
        },
        body: {
          children: {
            component: 'Grid',
            attrs: {
              style: {
                height: '400px',
              },
            },
            excelMode: {
              onCellValueChange: (args) => {
                // 更新对应日期的工时

                const { newValue, rowKey, field, cell } = args
                const row = cell.parent
                const rowData = data.find((item) => item.id === rowKey)
                if (rowData) {
                  const dateIndex = field.replace('day', '') - 1 // day1 -> 0, day2 -> 1, ...
                  if (rowData.dates[dateIndex]) {
                    rowData.dates[dateIndex].hours = newValue
                    // 重新计算总工时
                    rowData.totolHour = rowData.dates.reduce((sum, date) => {
                      return sum + (date.hours || 0)
                    }, 0)
                  }
                }

                row.props.data = rowData
                setTimeout(() => {
                  row.update()
                }, 0)
              },
            },
            classes: {
              'wt-work-hour-grid': true,
            },
            summary: {
              text: '日合计',
              // method 返回 { field: 需要展示的总结的数据 } 格式的对象
              columns: JSON.parse(JSON.stringify(columns)).map((x) => {
                delete x.editRender
                x.cellRender = ({ cellData }) => {
                  if (!cellData || x.field === 'description') {
                    return '-'
                  }
                  if (x.field === 'title') {
                    return cellData
                  }
                  if (x.field === 'totolHour') {
                    return `#<span>${cellData || 0} h</span>`
                  }
                  return `#<span style="color:${cellData > 8 ? '#f03e3e' : 'null'}">${
                    cellData || 0
                  } h</span>`
                }
                return x
              }),
              // eslint-disable-next-line
              method: ({ columns, data }) => {
                const res = {}
                columns.forEach((col) => {
                  if (
                    col.field === 'nom-grid-row-checker' ||
                    col.field === 'title' ||
                    col.field === 'description'
                  ) {
                    res[col.field] = ''
                  } else if (col.field === 'totolHour') {
                    // 统计表格内所有该字段值的合计
                    const total = data.reduce((sum, item) => {
                      return sum + (item.totolHour || 0)
                    }, 0)
                    res[col.field] = total
                  } else {
                    // 统计表格内所有该字段值的合计
                    const total = calculateTotal(data, col.field)
                    res[col.field] = total
                  }
                })

                return res
              },
            },
            columns: columns,
            data: data,
          },
        },
      }
    },
  }
})
