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
              date: '2023-10-01',
              hours: 8,
            },
            {
              date: '2023-10-02',
              hours: 6,
            },
            {
              date: '2023-10-03',
              hours: 7,
            },
            {
              date: '2023-10-04',
              hours: 8,
            },
            {
              date: '2023-10-05',
              hours: 5,
            },
            {
              date: '2023-10-06',
              hours: 8,
            },
            {
              date: '2023-10-07',
              hours: 6,
            },
          ],
          totolHour: 48,
        },
        {
          id: 2,
          title: '工时名称2',
          dates: [
            {
              date: '2023-10-01',
              hours: 7,
            },
            {
              date: '2023-10-02',
              hours: 8,
            },
            {
              date: '2023-10-03',
              hours: 6,
            },
            {
              date: '2023-10-04',
              hours: 7,
            },
            {
              date: '2023-10-05',
              hours: 8,
            },
            {
              date: '2023-10-06',
              hours: 5,
            },
            {
              date: '2023-10-07',
              hours: 8,
            },
          ],
          totolHour: 49,
        },
        {
          id: 3,
          title: '工时名称3',
          dates: [
            {
              date: '2023-10-01',
              hours: null, // 允许为空
            },
            {
              date: '2023-10-02',
              hours: 7,
            },
            {
              date: '2023-10-03',
              hours: 8,
            },
            {
              date: '2023-10-04',
              hours: 6,
            },
            {
              date: '2023-10-05',
              hours: 7,
            },
            {
              date: '2023-10-06',
              hours: 8,
            },
            {
              date: '2023-10-07',
              hours: 5,
            },
          ],
          totolHour: 47,
        },
      ]
      return {
        component: 'Grid',
        editable: {
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

        columns: [
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
              return `#${
                rowData.dates[0].hours || 0
              }<span style="color:#999; margin-left:2px"> h</span>`
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
              return `#${
                rowData.dates[1].hours || 0
              }<span style="color:#999; margin-left:2px"> h</span>`
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
              return `#${
                rowData.dates[2].hours || 0
              }<span style="color:#999; margin-left:2px"> h</span>`
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
              return `#${
                rowData.dates[3].hours || 0
              }<span style="color:#999; margin-left:2px"> h</span>`
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
              return `#${
                rowData.dates[4].hours || 0
              }<span style="color:#999; margin-left:2px"> h</span>`
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
              return `#${
                rowData.dates[5].hours || 0
              }<span style="color:#999; margin-left:2px"> h</span>`
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
              return `#${
                rowData.dates[6].hours || 0
              }<span style="color:#999; margin-left:2px"> h</span>`
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
            field: 'totolHour',
            title: '总工时',
            align: 'center',
            cellRender: ({ cellData }) => {
              return `#${cellData || 0}<span style="color:#999; margin-left:2px"> h</span>`
            },
          },
        ],
        data: data,
      }
    },
  }
})
