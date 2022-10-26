define([], function () {
  const options = [
    { id: 1, name: '萧峰', power: 90, speed: 90, agile: 85 },
    { id: 4, name: '虚竹', power: 100, speed: 80, agile: 90 },
    { id: 5, name: '段誉', power: 80, speed: 100, agile: 95 },
    { id: 6, name: '扫地僧', power: 100, speed: 100, agile: 'xxx' },
  ]

  const gridColumns = [
    { field: 'name', key: 'name', title: '姓名', width: 200, sortable: true },
    { field: 'power', key: 'power', title: '力量' },
    { field: 'speed', key: 'speed', title: '速度', sortable: (a, b) => b.speed - a.speed },
    { field: 'agile', key: 'agile', title: '敏捷', width: 500 },
  ]

  return {
    title: '表尾合计行',
    file: 'summary',
    demo: function () {
      return {
        component: 'Flex',
        rows: [
          {
            component: 'Grid',
            summary: true,
            rowCheckable: true,
            line: 'both',
            columns: gridColumns,
            data: options,
            frozenLeftCols: 2,
          },
          { component: 'Divider' },
          { component: 'StaticText', value: '自定义summary' },
          {
            component: 'Grid',
            summary: {
              text: '最小值',
              // method 返回 { field: 需要展示的总结的数据 } 格式的对象
              method: ({ columns, data }) => {
                const res = {}
                columns.forEach((col) => {
                  const values = data.map((item) => Number(item[col.field]))
                  const min = Math.min(...values)
                  res[col.field] = Number.isNaN(min) ? '-' : min
                })
                return res
              },
            },
            columns: gridColumns,
            data: options,
          },
        ],
      }
    },
  }
})
